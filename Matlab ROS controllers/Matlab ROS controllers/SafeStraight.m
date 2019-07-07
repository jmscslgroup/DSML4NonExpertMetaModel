function move = SafeStraight(sens_sub,dist)
    sensor = receive(sens_sub,10);
    scan = sensor.Ranges;
    move = true;
    for i = 65:1:114
        if(scan(i)<=dist)
            move = false;
        end
    end
end
   