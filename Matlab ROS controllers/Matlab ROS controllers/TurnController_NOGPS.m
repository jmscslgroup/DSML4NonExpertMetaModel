%This is a Turn Controller. It is meant to work specifically on the CATVehcile
%and is meant to publish in time and handle slowly-publishing GPS data

%Note - turn angle is not correct. .75 corresponds to 30 degrees to the
%right, and -.75 is about 30 degrees to the left.

function TurnController_NOGPS(velocity_publisher, vel_subscriber,sens_sub, data)

	dt = tic; %the time with which we integrate with respect to

    velocity = data(3)              % in m/s
    turningRadius = abs(data(2))    % in m
    angleToTurn = data(5)           % in degrees
    
    cmd_vel = rosmessage(velocity_publisher);
	cmd_vel.Linear.X = 0;
	cmd_vel.Linear.Y = 0;
	cmd_vel.Linear.Z = 0;
	cmd_vel.Angular.X = 0;
	cmd_vel.Angular.Y = 0;
    %Note - we threw in the thing at the end as an adjustment constant
    %thingy.
    %cmd_vel.Angular.Z = (1+0.00015*(data(3)^2))*(atan(2.62 / (-sign(data(1)-2.5)*data(2))))... %Steering angle
    %    * (9/(20*pi)); %random linear constant needed for the fix
        %The sign() part converts the radius of curvature into positive and negatives
		%is calculated from formula from the torc manual
    
    wheelBase = 2.62;               % from TORC manual, in m
    understeerCoefficient = 0.0015; % from TORC manual, unitless
  
    turningScale = 1.0;  % If the vehicle doesn't turn quite correctly, adjust this
    Curvature = 1.0/(turningRadius * turningScale); % TORC: inverse of turning radius
    LEFT = 2;
    RIGHT = 3;
    direction = 1.0; % -1 for left, 1 for right. (Gazeebo differs from the TORC manual)
    if data(1) == LEFT
        direction = -1.0;
    elseif data(1) == RIGHT
        direction = 1.0;
    else
        display('Invalid command sent to the TurnController. Halting...');
        HaltController(velocity_publisher, 0.05);
        return;
    end
    %direction = -sign(data(1)-2.5); % data(1)==2 => -(-1)==1 => left, data(1)==2 => -(-1)==1 => left,
    % This is a corrected version of the above implementation taken from the TORC manual.  A tuning factor was added to the turning raidus. 
    cmd_vel.Angular.Z = direction * (1 + understeerCoefficient*(velocity^2))* atan(wheelBase * Curvature)* (9/(20*pi)*0.98) ;
    %cmd_vel.Angular.Z = direction * (1 + understeerCoefficient*(velocity^2))* atan(wheelBase * Curvature);% * (9/(20*pi)) ;
    
    %steeringAngle= cmd_vel.Angular.Z * 400 %Steering angle in degrees
    
    ArcDist = 0;
    DesiredDist = turningRadius * angleToTurn*pi/180
    disp(data);
    
    %pause on
    %for i=1:100 
    %    display('Setting Steering...');
    %    send(velocity_publisher, cmd_vel); 
    %    pause(0.02);
    %end
    
    cmd_vel.Linear.X = velocity;
    while(DesiredDist > ArcDist)
        try
            msg=receive(vel_subscriber, 10);
            sensor = receive(sens_sub,10);
            scan = sensor.Ranges;
        catch
            display('The Velocity signal has timed out. It is required to run the controllers. Halting...');
                HaltController(velocity_publisher, 0.05);
        end %try
        
        %gazebo:
%         ArcDist = ArcDist + toc(dt)*msg.Twist.Twist.Linear.X;
        %CatVehicle:
        ArcDist = ArcDist + toc(dt)*msg.Linear.X;
        %check = [DesiredDist;ArcDist]
        
        %%%DEBUG
        display([ArcDist, DesiredDist-ArcDist]);
        %%%END DEBUG
        %%%DK Implementation
        for(i = 1:size(scan))
            if scan(i)<5
                disp("Unsafe");
                HaltController(velocity_publisher,.05);
            else
                send(velocity_publisher, cmd_vel);
            end 
        end
        dt = tic;       
      end %while
end %function