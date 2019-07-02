function move = SafeStraight(sens_sub,data)
    sensor = receive(sens_sub,10);
    scan = sensor.Ranges;
    move = true;
    for i = 65:1:114
        if(scan(i)<=(data(4)*2))
            move = false;
        end
    end
end
   