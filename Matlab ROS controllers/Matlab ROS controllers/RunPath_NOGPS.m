%Runs a path file output from GME by sending commands to the catVehcile

%Forgot to set up the terminal for the catvehicle beforehand? uncomment the two lines below!
%setenv('ROS_MASTER_URI','http://rtd4.local:11311'); % edit this to be the address of the machine running roscore. In the catVehcile, this is rtd4
%setenv('ROS_HOSTNAME', 'TheMachine.local'); %edit this to be the name of your machine

try
    rosinit;
catch
    display('rosinit failed. Continuing...')
%     rosshutdown;
%     rosinit;
end

%Gazebo:
%   pose_sub = rossubscriber('/odom'); vel_pub = rospublisher('/cmd_vel');
%CatVehcile:
  pose_sub = rossubscriber('/catvehicle/vel'); vel_pub = rospublisher('/catvehicle/cmd_vel');

if(exist ('PathFileName', 'var'))
    data= dlmread(PathFileName);
else
    fprintf('PathFileName is not set. ');
    try
    data=dlmread('Test_Path.txt');
    display('Using Test_Path.txt instead.');
    catch
        display('Please specify a path file to read.');
        return;
    end
end

for(i = 1:size(data,1)) %For each row in the path data matrix
    display(i); % Displays the current state number. Can be removed if 
    switch data(i,1)
        case 1  % go straight 
            disp('Go Straight')
            %                        ROS_Pub  ROS_Sub   data
            StraightController_NOGPS(vel_pub, pose_sub, data(i,:));
        case 2     % make a left turn
            disp('Make a left turn');
            TurnController_NOGPS(vel_pub, pose_sub, data(i,:));
        case 3     % make a right turn
            disp('Make a right turn');
            TurnController_NOGPS(vel_pub, pose_sub, data(i,:));      
        case 4      % stop
            disp('Stop')
            disp('Path complete.');
            return;
        otherwise % exit now
            disp('Invalid state. Press Ctrl-C to quit');
            HaltController(vel_pub, 0.05); %Change this if you get motion profile timeouts.
    end
end