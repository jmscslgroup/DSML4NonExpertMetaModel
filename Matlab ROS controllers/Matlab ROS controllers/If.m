function done = If(velpub,velsub,senssub,condition,codeToExecute)
    straightData = [1,0,1,12.192,0];
leftTurnData = [2,12.192,1,0,90];
rightTurnData = [3,12.192,1,0,90];
zigzagTurnData = [3, 6.096, 1, 0, 90];
zigzagTurnData1 = [2, 6.096, 1, 0, 90];
if(condition==1) 
        if(SafeLeft(senssub,abs(leftTurnData(2)) * 90*pi/180))
            for(k=1:length(codeToExecute))
        code = codeToExecute(k);
        if(strcmp(code,"Straight"))
            StraightController_NOGPS(velpub,velsub,sensorsub,straightData);
        elseif(strcmp(code,"Left"))
            TurnController_NOGPS(velpub,velsub,sensorsub,leftTurnData);
        elseif(strcmp(code,"Right"))
            TurnController_NOGPS(velpub,velsub,sensorsub,rightTurnData);
        elseif(strcmp(code,"ZigZagLeft"))
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
        elseif(strcmp(code,"ZigZagRight")) 
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
        elseif(strcmp(code,"Horn"))
            Horn();
        elseif(strcmp(code,"Left_Signal"))
            LeftSignal();
        elseif(strcmp(code,"Right_Signal")) 
            RightSignal();
        elseif(strcmp(code,"Hazard"))  
            Hazard();
            end
            end
        end
    elseif(condition==2)
        if(SafeStraight(sensesub,straightData(4)))
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
            if(SafeRight(senssub,abs(rightTurnData(2)) * 90*pi/180))
                 for(k=1:length(codeToExecute))
        code = codeToExecute(k);
        if(strcmp(code,"Straight"))
            StraightController_NOGPS(velpub,velsub,sensorsub,straightData);
        elseif(strcmp(code,"Left"))
            TurnController_NOGPS(velpub,velsub,sensorsub,leftTurnData);
        elseif(strcmp(code,"Right"))
            TurnController_NOGPS(velpub,velsub,sensorsub,rightTurnData);
        elseif(strcmp(code,"ZigZagLeft"))
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
        elseif(strcmp(code,"ZigZagRight")) 
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData1);
            TurnController_NOGPS(velpub,velsub,sensorsub,zigzagTurnData);
        elseif(strcmp(code,"Horn"))
            Horn();
        elseif(strcmp(code,"Left_Signal"))
            LeftSignal();
        elseif(strcmp(code,"Right_Signal")) 
            RightSignal();
        elseif(strcmp(code,"Hazard"))  
            Hazard();
                end
                 end
            end
    end
end