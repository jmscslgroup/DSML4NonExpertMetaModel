function HaltController(RosPub, ROS_SleepTime)
    pause on;
    cmd_vel = rosmessage(RosPub);
    cmd_vel.Linear.X = 0;
    cmd_vel.Linear.Y = 0;
    cmd_vel.Linear.Z = 0;
    cmd_vel.Angular.X = 0;
    cmd_vel.Angular.Y = 0;
    cmd_vel.Angular.Z = 0;
    
    while (1)
%         Time = tic;
%         send(RosPub, cmd_vel);
        pause %(ROS_SleepTime/2 - toc(Time)); %/2 because it doesn't hurt to publish too fast
    end

end %Function