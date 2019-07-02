%Runs a path file output from GME by sending commands to the catVehcile

%Forgot to set up the terminal for the catvehicle beforehand? uncomment the two lines below!
%ROS_MASTER_URI='http://rtd4.local:11311'
ROS_MASTER_URI='http://rosfet.local:11311'
ROS_HOSTNAME= 'rosfet.local'
ROS_MASTER_URI='http://localhost:11311'
ROS_HOSTNAME= 'localhost'
setenv('ROS_MASTER_URI',ROS_MASTER_URI); % edit this to be the address of the machine running roscore. In the catVehcile, this is rtd4
setenv('ROS_HOSTNAME', ROS_HOSTNAME); %edit this to be the name of your machine

try
    rosinit(ROS_MASTER_URI);
catch
    display('rosinit failed. Continuing...')
     rosshutdown;
     rosinit(ROS_MASTER_URI);
end

%Gazebo:
%   pose_sub = rossubscriber('/odom'); vel_pub = rospublisher('/cmd_vel');
%CatVehcile:
  pose_sub = rossubscriber('/azcar_sim/vel'); vel_pub = rospublisher('/azcar_sim/cmd_vel',rostype.geometry_msgs_Twist);
% pose_sub = rossubscriber('/catvehicle/vel'); vel_pub = rospublisher('/catvehicle/cmd_vel',rostype.geometry_msgs_Twist);
  
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

STRAIGHT = 1;
LEFT = 2;
RIGHT = 3;
STOP = 4;

gridDistance = 10; %32.8084 feet             %13.716; % 45 feet
Distance = gridDistance;
Velocity = 1;
FinalTurnAngle = 90;
RadOfCurvature = gridDistance;

for(i = 1:size(data,1)) %For each row in the path data matrix
    display(i); % Displays the current state number. Can be removed if
    switch data(i,1)
        case STRAIGHT  % go straight
            disp('Go Straight')
            %                        ROS_Pub  ROS_Sub   data
			%[STRAIGHT, unused, Velocity, Distance, unused]
			cannedData = [STRAIGHT, 0.0, Velocity, Distance, 0.0];
			%StraightController_NOGPS(vel_pub, pose_sub, data(i,:));
			StraightController_NOGPS(vel_pub, pose_sub, cannedData);

        case LEFT     % make a left turn
			disp('Make a left turn');
			%[LEFT, RadOfCurvature, Velocity, unused, -FinalTurnAngle]
			cannedData = [LEFT, RadOfCurvature, Velocity, 0.0, FinalTurnAngle];
            TurnController_NOGPS(vel_pub, pose_sub, cannedData);
        case RIGHT     % make a right turn
			disp('Make a right turn');
			%[RIGHT, RadOfCurvature, Velocity, unused, FinalTurnAngle]
			cannedData = [RIGHT, RadOfCurvature, Velocity, 0.0, FinalTurnAngle];
            TurnController_NOGPS(vel_pub, pose_sub, cannedData);
        case STOP      % stop
            disp('Stop')
            disp('Path complete.');
            return;
        otherwise % exit now
            disp('Invalid state. Press Ctrl-C to quit');
            HaltController(vel_pub, 0.05); %Change this if you get motion profile timeouts.
    end
end
 