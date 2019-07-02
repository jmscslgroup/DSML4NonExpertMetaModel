%This is a straight controller. The velocity is handled by the car, but it
%tries to keep running until the desired distance is met

function StraightController_NOGPS(vel_publisher, vel_subscriber,sens_sub,data)
    
    dt = tic; % Time to integrate wrt

    cmd_vel = rosmessage(vel_publisher);
    cmd_vel.Linear.X = data(3);
    cmd_vel.Linear.Y  = 0;
    cmd_vel.Linear.Z  = 0;
    cmd_vel.Angular.X = 0;
    cmd_vel.Angular.Y = 0;
    cmd_vel.Angular.Z = 0;
    
    Dist = 0;
   
   
    while(data(4) > Dist)
        try
            msg = receive(vel_subscriber, 10);
            sensor = receive(sens_sub,10);
            scan = sensor.Ranges;
        catch
            display('/azcar_sim/vel timeout');
            HaltController(vel_publisher, .05) %Change .05 if you get motion profile timeouts
        end

        %gazebo:
%         Dist = Dist + toc(dt)*msg.Twist.Twist.Linear.X;
        %CatVehicle:
        Dist = Dist + toc(dt)*msg.Linear.X;
        
        display(data(4) - Dist);

        dt = tic;
        %%%DK Implementation
        for(i = 1:size(scan))
            if scan(i)<5
                disp("Unsafe");
                HaltController(vel_publisher,.05);
            else
                send(vel_publisher, cmd_vel);
            end 
        end
    end %while (distance)
    end %function
