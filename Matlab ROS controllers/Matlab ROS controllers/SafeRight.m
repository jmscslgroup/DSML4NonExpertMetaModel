function move = SafeRight(sens_sub,dist)
    sensor = receive(sens_sub,10);
   scan = sensor.Ranges;
    move = true;
    for i = 14:1:64
        if(scan(i)<=dist)
            move = false;
        end
    end
end
       