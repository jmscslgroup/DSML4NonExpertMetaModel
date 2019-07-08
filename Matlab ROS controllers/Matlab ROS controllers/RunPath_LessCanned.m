%Runs a path file output from GME by sending commands to the catVehcile

%Forgot to set up the terminal for the catvehicle beforehand? uncomment the two lines below!
ROS_MASTER_URI='http://samhum.local:11311'
%ROS_MASTER_URI='http://rosfet.local:11311'
ROS_HOSTNAME= 'samhum.local'
%ROS_MASTER_URI='http://localhost:11311'
%ROS_HOSTNAME= 'localhost'
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
%  pose_sub = rossubscriber('/azcar_sim/vel'); vel_pub = rospublisher('/azcar_sim/cmd_vel',rostype.geometry_msgs_Twist);
 pose_sub = rossubscriber('/catvehicle/vel'); vel_pub = rospublisher('/catvehicle/cmd_vel',rostype.geometry_msgs_Twist);
  sensor_sub = rossubscriber('/catvehicle/front_laser_points');
  
if(exist ('ans', 'var'))
    data= dlmread(ans);
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
FOR = 6;
WHILE = 7;
IF = 8;
HORN = 9;
LEFTSIGNAL = 10;
RIGHTSIGNAL = 11;
HAZARD = 12;
STOP = 4;

gridDistance = 6.096*2;%10; %32.8084 feet             %13.716; % 45 feet
Distance = gridDistance;
Velocity = 1;
FinalTurnAngle = 90;
RadOfCurvature = gridDistance;

for(i = 1:size(data,1)) %For each row in the path data matrix
    display(i); % Displays the current state number. Can be removed if
    if(data(i,1)<4)
    data(i,4) = data(i,4)*(40+40)/(40+40+4); % Straight distance
    data(i,3) = data(i,3)*1.25; % Speed
    data(i,2) = data(i,2)*(40+40)/(40+40+4)*1.0;%1.1; % Turning radius
    %if(data(i,2) > 10)  % WARNING FOR VV SMALL FIELD ONLY!
    %    data(i,2) = data(i,2)*0.9;
    %end
    if((data(i,2)) < 10 && (data(i,2) > 0))  % WARNING FOR CV ZIGZAG ONLY!
        data(i,3) = data(i,3)*0.75;
    end
    end
    switch data(i,1)
        case STRAIGHT  % go straight
            disp('Go Straight')
            %                        ROS_Pub  ROS_Sub   data
			%[STRAIGHT, unused, Velocity, Distance, unused]
            data(i,3) = data(i,3)*1.00;
            %data(i,4) = data(i,4)*0.9; % Straight distance WARNING THIS WAS FOR VV ONLY!
			cannedData = data(i,:);%[STRAIGHT, 0.0, Velocity, Distance, 0.0];
			%StraightController_NOGPS(vel_pub, pose_sub, data(i,:));
			StraightController_NOGPS(vel_pub, pose_sub,sensor_sub,cannedData);

        case LEFT     % make a left turn
			disp('Make a left turn');
			%[LEFT, RadOfCurvature, Velocity, unused, -FinalTurnAngle]
			%cannedData = [LEFT, RadOfCurvature, Velocity, 0.0, FinalTurnAngle];
            cannedData = data(i,:);
            TurnController_NOGPS(vel_pub, pose_sub,sensor_sub,cannedData);
        case RIGHT     % make a right turn
			disp('Make a right turn');
			%[RIGHT, RadOfCurvature, Velocity, unused, FinalTurnAngle]
			cannedData = data(i,:);%[RIGHT, RadOfCurvature, Velocity, 0.0, FinalTurnAngle];
            TurnController_NOGPS(vel_pub, pose_sub,sensor_sub,cannedData);
        case STOP      % stop
            disp('Stop')
            disp('Path complete.');
            return;
        case FOR
            disp('For');
            path = data(i,4:length(data(i,:)));
            disp("The path is "+path);
            For(vel_pub,pose_sub,sensor_sub,data(i,2),path);
        case WHILE
            disp('While');
            path = data(i,4:length(data(i,:)));
            disp("The path is "+path);
            While(vel_pub,pose_sub,sensor_sub,data(i,3),path);
        case IF
            disp('If');
            path = data(i,4:length(data(i,:)));
            disp("The path is "+path);
            If(vel_pub,pose_sub,sensor_sub,data(i,3),path);
        case HORN
            Horn();
        case LEFTSIGNAL
            LeftSignal();
        case RIGHTSIGNAL
            RightSignal();
        case HAZARD
            Hazard();
        otherwise % exit now
            disp('Invalid state. Press Ctrl-C to quit');
            HaltController(vel_pub, 0.05); %Change this if you get motion profile timeouts.
    end
end
 
