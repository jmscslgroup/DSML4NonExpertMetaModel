function filename = loadCarPath(group)
    filename = strcat('~/Desktop/TestPaths/',group);
    filename = strcat(filename,'/GeneratedCode/Path/Path.txt');
    try
        data=dlmread(filename);
        display('Success!');
    catch
        display('ERROR! --  Path does NOT exist!');
        display(filename);
        return;
    end
end
