//Made By BioShot\

$(document).ready(function () {
    $("#btn-import").click(function(){
        document.getElementById("importfile").click();
        $("#importfile").change(function (event){
            const files = event.target.files;
            
            const reader = new FileReader();
        
    reader.addEventListener('load', function (event){
        const content = JSON.parse(event.target.result);
        const editorData = content.$editorData
        const object = content.$object
        const port3d = {}
        const bioshot = {}
        bioshot.conditionalRotation = {};
        bioshot.conditionalRotation.trigger = function(){
            if(object.camera.conditionalRotation[0]=="port3d.rotation.y"&&object.camera.conditionalRotation[1]=="port3d.rotation.x"){
                return `
                    requestAnimationFrame( renderN );
                    
				    cube.rotation.x += 0.01;
				    cube.rotation.y += 0.01;
                    
				    render.render( scene, camera );`
            }
        }
        if(object.name){
            
            const scene = new THREE.Scene();
            const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
            const render = new THREE.WebGLRenderer();
            render.setSize(window.innerWidth, window.innerHeight);
            document.body.appendChild(render.domElement);
            $("#btn-import").remove();
            $("#btn-export").remove();
            if(object.source){
                const geometry = new THREE.BoxGeometry(object.size[0],object.size[1],object.size[2])
                const material = new THREE.MeshBasicMaterial({color: 0x00ff00});
                const cube = new THREE.Mesh(geometry, material);
                scene.add( cube );
                
                camera.position.z = 5;
                if(object.camera.rotation[0] == "port3d.movement.mouseY" && object.camera.rotation[1] == "port3d.movement.mouseX" && object.camera.rotation[2] == undefined){
                     function renderN() {
                        requestAnimationFrame(renderN);
                        if(object.camera.conditionalRotation != undefined){
                           const promise1 = new Promise((resolve, reject) => {
                            if(eval(object.camera.conditionalRotation[2].code) == true){
                               eval(bioshot.conditionalRotation.trigger());
                            }else{
                                throw "error!"
                            }
                        });
                        promise1.catch(function (){
                            console.log("error!")
                            $(document).mousedown(function () {
                          $(document).mousemove(function (e) {
                            if(eval(object.camera.conditionalRotation[2].code) == true){
                               eval(bioshot.conditionalRotation.trigger());
                            }else{
                                console.log(e.pageX, e.pageY)       
                                cube.rotation.y = e.pageX / 100;
                                cube.rotation.x = e.pageY / 100;
                            }
                                
                            });
                        });
                        $(document).mouseup(function () {
                            $(document).unbind('mousemove');
                        });
                        render.render( scene, camera );
                            
                        })
                        
                    }
                        
                    }
                    renderN();
                    
                }else{
                function animate() {
				    requestAnimationFrame( animate );
                    
				    cube.rotation.x += 0.01;
				    cube.rotation.y += 0.01;
                    
				    render.render( scene, camera );
                }
                
			};

			animate();
            }
        }else{
            swal.fire({
                icon:"error",
                title:"Error!",
                html:`This Port3D Object is invalid! (Forgot to add name in json) <style>.swal2-popup {
  font-size: 1.2rem !important;
  font-family: sfpro;
}
.swal2-title{
    color: red;
}
.swal2-html-container{
    color:gray;
}</style>`,
              
                
                background:"rgb(48, 48, 48)"
            })
        }
    })
           reader.readAsBinaryString(files[0])

  
        })
    })
    $("#btn-export").click(function(){
        if(document.import != undefined){
            //Run the export function
        }else{
            swal.fire({
                icon:"error",
                title:"Error!",
                html:`There is nothing to export! <style>.swal2-popup {
  font-size: 1.2rem !important;
  font-family: sfpro;
}
.swal2-title{
    color: red;
}
.swal2-html-container{
    color:gray;
}</style>`,
              
                
                background:"rgb(48, 48, 48)"
            })
            
        }
    })
});
