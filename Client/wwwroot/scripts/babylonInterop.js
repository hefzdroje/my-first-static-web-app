﻿var babylonInterop = babylonInterop || {};


babylonInterop.initCanvas = function (canvasId) {


    var babylonCanvas = document.getElementById(canvasId);
    var babylonEngine = new BABYLON.Engine(babylonCanvas, true);
    var scene = babylonInterop.createSceneWithSphere(babylonEngine, babylonCanvas);

    babylonEngine.runRenderLoop(function () {
        scene.render();
    });

    window.addEventListener("resize", function () {
        babylonEngine.resize();
    });
};

babylonInterop.createSceneWithSphere = function (engine, canvas) {

    var scene = new BABYLON.Scene(engine);
    scene.clearColor = new BABYLON.Color3(0.7, 0.7, 0.7);

    var camera = new BABYLON.ArcRotateCamera("Camera", Math.PI / 2, Math.PI / 2, 2, new BABYLON.Vector3(0, 0, -250), scene);
    camera.setPosition(new BABYLON.Vector3(0, 0, 200));
    camera.attachControl(canvas, true);

    var light1 = new BABYLON.HemisphericLight("light1", new BABYLON.Vector3(0.051, 0.051, 0), scene);
    //var light2 = new BABYLON.PointLight("light2", new BABYLON.Vector3(0, 0.051, -0.051), scene);

    var sphere = BABYLON.MeshBuilder.CreateSphere("sphere", { diameter: 3.5 }, scene);

    var mat = new BABYLON.StandardMaterial("mat1", scene);
    mat.emissiveColor = new BABYLON.Color3(0.9, 0.5, 0.0);
    sphere.material = mat;
  
    sphere.position.y = -2;
/////////////////////////////////////////////////////////////////////////////////////////////////////

    //BABYLON.SceneLoader.ImportMesh("", "", "https://hefzdroje.github.io/libs/trion.stl", scene, function (newMeshes0) { // beg ImportMesh freza
    BABYLON.SceneLoader.ImportMesh("", "", "trion.stl", scene, function (newMeshes0) { 
    var cyl0 = newMeshes0[0];

    var mat0 = new BABYLON.StandardMaterial("mat10", scene);
    mat0.emissiveColor = new BABYLON.Color3(0.0, 0.9, 0.73);
    cyl0.material = mat0;
    cyl0.position.x = 50;
    //cyl.rotate(axisx, Math.PI / 2, BABYLON.Space.LOCAL);

    var axisy0 = new BABYLON.Vector3(0, 6, 0);
    var axisx0 = new BABYLON.Vector3(6, 0, 0);
    var axisz0 = new BABYLON.Vector3(0, 0, 6);

    //cyl0.rotate(axisx0, Math.PI / 2, BABYLON.Space.LOCAL);


    BABYLON.SceneLoader.ImportMesh("", "", "freza.stl", scene, function (newMeshes) {    
    //BABYLON.SceneLoader.ImportMesh("", "", "https://hefzdroje.github.io/libs/freza.stl", scene, function (newMeshes) { // beg ImportMesh freza
    var cyl = newMeshes[0];
    //console.log(" cyl = ",cyl.vertices[]);
    //console.log(" cyl = " + cyl.vertices[]);
    //console.log("cyl = ", cyl.geometry._indices[3000]);
    //console.log("cyl = ", cyl.geometry._normal);
    //console.log("cyl = ", cyl.geometry._vertexBuffers);
    //console.log("cyl = ", cyl._geometry._meshes);
    //console.log("cyl = ", cyl.geometry._totalVertices);

    var mat = new BABYLON.StandardMaterial("mat1", scene);
    mat.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4); //sedomodra (0.3, 0.3, 0.55) zelinka (0.55, 0.55, 0.3)
    cyl.material = mat;
    cyl.position.x = 0;
    //cyl.rotate(axisx, Math.PI / 2, BABYLON.Space.LOCAL);

    var axisy = new BABYLON.Vector3(0, 6, 0);
    var axisx = new BABYLON.Vector3(6, 0, 0);
    var axisz = new BABYLON.Vector3(0, 0, 6);

    cyl.rotate(axisy, Math.PI / 2, BABYLON.Space.LOCAL);

//-------------------------------------ANIMACE----------------------------------------------------------------


        rever = 0.3;
        var smer = 3;
        cit = 0;
        var angle = 0.03;
        var mex = document.getElementById("myTextarea").value;
        var predpage = "nic";
        var nynipage = "dejte slovo červený na 0 pozici textu a vyčkejte na levou obrátku frézy";
        scene.registerBeforeRender(function () { // beg animations

            nynipage = document.getElementById("myTextarea").value;

            if (nynipage != predpage)
                { 

                 if ((nynipage.indexOf("červený") >= 0)&&(predpage.indexOf("jiný") == 0))
                    { 
                        //console.log(" nynipage  = ",nynipage," predpage  = ",predpage);
                        location.reload();
                    }
                    predpage = nynipage;

                }


            ////cyl.rotate(axisz, angle*10, BABYLON.Space.LOCAL);
            cyl.rotate(axisy, angle * smer  );
            
            cit += rever;


            if (cit <= 100)
            { 
               //console.log(" ------cit- - - --- = ",cit);
                cyl.position.x = cit;

                sphere.scaling.x = cit/15;
                sphere.scaling.y = cit/15;
                sphere.scaling.z = cit/15;
            }

            
            if (cit > 100)
                { 
                    

                        mex = document.getElementById("myTextarea").value;
                        //document.getElementById("demo").innerHTML = mex;


                        if (mex.indexOf("červený") == 0)
                            { 
                                //mat.emissiveColor = new BABYLON.Color3(0.1, 0.45, 0.45); //modrá(0.3, 0.3, 0.55)
                                mat0.emissiveColor = new BABYLON.Color3(0.95, 0.2, 0.4);
                                cyl0.rotate(axisx0, -Math.PI / 2, BABYLON.Space.LOCAL);
                                smer = -3; 
                            }
                            else
                            { 
                                //mat.emissiveColor = new BABYLON.Color3(0.55, 0.55, 0.3);
                                //mat.emissiveColor = new BABYLON.Color3(0.4, 0.4, 0.4);
                                mat0.emissiveColor = new BABYLON.Color3(0.0, 0.9, 0.73);
                                cyl0.rotate(axisx0, Math.PI / 2, BABYLON.Space.LOCAL);
                                smer = 3;
                            }
    


                    //console.log(" +++ MEX 06  = ",mex);
                    //cit = 0;
                    rever = rever*-1;
                }
                if (cit < 0)
                    { 
                        //console.log(" - - - mevar = ",mevar);
                        rever = rever*-1;
                    }

        }); // end animations



//---------------------------------------end ANIMACE--------------------------------------------------------------
   

});  //end  pro ImportMesh freza
});  //end  pro ImportMesh trion



////////////////////////////////////////////////////////////////////////////////////////////////////
    return scene;
};

