function done = While(velpub,velsub,senssub,condition,codeToExecute)
    straightData = [1,0,1,12.192,0];
leftTurnData = [2,12.192,1,0,90];
rightTurnData = [3,12.192,1,0,90];
zigzagTurnData = [3, 6.096, 1, 0, 90];
zigzagTurnData1 = [2, 6.096, 1, 0, 90];
if(condition==1) 
        while(SafeLeft(senssub,abs(leftTurnData(2)) * 90*pi/180))
            for(k=1:length(codeToExecute))
        code = codeToExecute(k);
        if(code==1)
            StraightController_NOGPS(velpub,velsub,sensorsub,straightData);
        elseif(code==2)
            TurnController_NOGPS(velpub,velsub,sensorsub,leftTurnData);
        elseif(code==3)
            TurnController_NOGPS(velpub,velsub,sensorsub,rightTurnData);
        elseif(code==4)
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
        elseif(code==5) 
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
        elseif(code==9)
            Horn();
        elseif(code==10)
            LeftSignal();
        elseif(code==11) 
            RightSignal();
        elseif(code==12)  
            Hazard();
                end
            end
        end
    elseif(condition==2)
        while(SafeStraight(senssub,straightData(4)))
           for(k=1:length(codeToExecute))
        code = codeToExecute(k);
        if(code==1)
            StraightController_NOGPS(velpub,velsub,sensorsub,straightData);
        elseif(code==2)
            TurnController_NOGPS(velpub,velsub,sensorsub,leftTurnData);
        elseif(code==3)
            TurnController_NOGPS(velpub,velsub,sensorsub,rightTurnData);
        elseif(code==4)
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
        elseif(code==5) 
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
        elseif(code==9)
            Horn();
        elseif(code==10)
            LeftSignal();
        elseif(code==11) 
            RightSignal();
        elseif(code==12)  
            Hazard();
                end
            end
        end
        else
            while(SafeRight(senssub,abs(rightTurnData(2)) * 90*pi/180))
                 for(k=1:length(codeToExecute))
        code = codeToExecute(k);
        if(code==1)
            StraightController_NOGPS(velpub,velsub,senssub,straightData);
        elseif(code==2)
            TurnController_NOGPS(velpub,velsub,senssub,leftTurnData);
        elseif(code==3)
            TurnController_NOGPS(velpub,velsub,senssub,rightTurnData);
        elseif(code==4)
            TurnController_NOGPS(velpub,velsub,senssub,zigzagTurnData);
            TurnController_NOGPS(velpub,velsub,senssub,zigzagTurnData1);
        elseif(code==5) 
            TurnController_NOGPS(velpub,velsub,senssub,zigzagTurnData1);
            TurnController_NOGPS(velpub,velsub,senssub,zigzagTurnData);
        elseif(code==9)
            Horn();
        elseif(code==10)
            LeftSignal();
        elseif(code==11) 
            RightSignal();
        elseif(code==12)  
            Hazard();
                end
                 end
            end
    end
end