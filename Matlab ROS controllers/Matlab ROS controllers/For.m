function done = For(velpub,velsub,sensorsub,times,codeToExecute)
%For does the for loop for language
%   iterates times times and executes code to execute
done = false;
straightData = [1,0,1*1.25,12.192*(40+40)/(40+40+4),0];
leftTurnData = [2,12.192*(40+40)/(40+40+4)*1.0,1*1.25,0,90];
rightTurnData = [3,12.192*(40+40)/(40+40+4)*1.0,1*1.25,0,90];
zigzagTurnData = [3, 6.096*(40+40)/(40+40+4)*1.0, .75*1.25, 0, 90];
zigzagTurnData1 = [2, 6.096*(40+40)/(40+40+4)*1.0, .75*1.25, 0, 90];
disp("Should output "+times);
for(i = 1:1:times)
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
end