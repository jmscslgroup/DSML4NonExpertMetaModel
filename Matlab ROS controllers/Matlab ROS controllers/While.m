function done = While(velpub,velsub,senssub,condition,codeToExecute)
    if(condition==1) 
        while(SafeLeft())
            for i = 1:length(codeToExecute)
                if(codeToExecute(i)==Left)
                    TurnController
            end
        end
    else if(condition==2)
            while(SafeStraight())
                for i = 1:length(codeToExecute)
                end
            end
        else
            while(SafeRight())
                for i = 1:length(codeToExecute)
                end
            end
    end
end