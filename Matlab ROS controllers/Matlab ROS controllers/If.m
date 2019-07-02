function done = If(velpub,velsub,condition,codeToExecute)
    if condition==1
        if(SafeLeft())
            for(i = 1:length(codeToExecute))
            end
        end
    else if condition==2
         if(SafeStraight())
             for(i=1:length(codeToExecute))
             end
         end
    else condition==3
        if(SafeRight())
             for(i=1:length(codeToExecute))
             end
         end
        end
    end