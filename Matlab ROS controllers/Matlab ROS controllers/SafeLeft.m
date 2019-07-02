function move = SafeLeft(sens_sub,dist)
    sensor = receive(sens_sub,10);
   scan = sensor.Ranges;
    move = true;
    for i = 115:1:165
            if(scan(i)<=dist)
                move = false;
            end
    end
end