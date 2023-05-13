AFRAME.registerComponent("create-markers", {
    init: async function(){
      var main_scene = document.querySelector("#main-scene")
      var dishes = await this.getdishes()
      dishes.map(
        dish => {
          var marker = document.createElement("a-marker")
          marker.setAttribute("id",dish.id)
          marker.setAttribute("type","pattern")
          marker.setAttribute("url",dish.marker_pattern_url)
          marker.setAttribute("cursor",{rayOrigin: "mouse"})
          marker.setAttribute("markerhandler",{})
          main_scene.appendChild(marker)
  
          var model = document.createElement("a-entity")
          model.setAttribute("id",`model-${dish.id}`)
          model.setAttribute("position",dish.model_geometry.position)
          model.setAttribute("rotation",dish.model_geometry.rotation)
          model.setAttribute("scale",dish.model_geometry.scale)
          model.setAttribute("gltf-model",`url(${dish.model_url})`)
          model.setAttribute("gesture-handler",{})
          main_scene.appendChild(model)
          
          var main_plane = document.createElement("a-plane")
          main_plane.setAttribute("id",`plane-${dish.id}`)
          main_plane.setAttribute("position",{
            x : 0,
            y: 0,
            z: 0
          })
          main_plane.setAttribute("rotation",{
            x : -90,
            y : 0,
            z : 0
          })
          main_plane.setAttribute("width",1.7)
          main_plane.setAttribute("height",1.5)
          marker.appendChild(main_plane)
        
          var title = document.createElement("a-plane")
          title.setAttribute("id",`title-${dish.id}`)
          title.setAttribute("position",{
            x : 0,
            y: 0.9,
            z: 0
          })
          title.setAttribute("rotation",{
            x : 0,
            y : 0,
            z : 0
          })
          title.setAttribute("width",1.69)
          title.setAttribute("height",0.3)
          title.setAttribute("material",{
            color: "cyan"
          })
          main_plane.appendChild(title)
  
          var title1 = document.createElement("a-entity")
          title1.setAttribute("id",`title1-${dish.id}`)
          title1.setAttribute("position",{
            x : 0,
            y: 0,
            z: 0.1
          })
          title1.setAttribute("rotation",{
            x : 0,
            y : 0,
            z : 0
          })
          title1.setAttribute("text",{
            font:"monoid",
            color : "black",
            width: 2,
            height:1,
            align:"center",
            value: dish.dish_name.toUpperCase()
          })
          title.appendChild(title1)
  
          var ing = document.createElement("a-entity")
          ing.setAttribute("id",`ing-${dish.id}`)
          ing.setAttribute("position",{
            x:0.3,
            y:0,
            z:0
          })
          ing.setAttribute("rotation",{
            x:0,
            y:0,
            z:0
          })
          ing.setAttribute("text",{
            font:"monoid",
            color:"black",
            align:"left",
            value: `${dish.ingredients.join("\n")}`
          })
          main_plane.appendChild(ing)
        },
      )
    },
    getdishes  : async function(){
      return await firbase.firestore().get().then(snap => {return snap.docs.map(doc => doc.data())})
    },
    });