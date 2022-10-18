AFRAME.registerComponent("markerhandler", {
  init: async function() {
    this.el.addEventListener("markerFound", () => {
      console.log("marker is found");
      this.handleMarkerFound();
    });

    this.el.addEventListener("markerLost", () => {
      console.log("marker is lost");
      this.handleMarkerLost();
    });
  },
  handleMarkerFound: function() {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "flex";

    var orderButtton = document.getElementById("order-button");
    var orderSummaryButtton = document.getElementById("order-summary-button");

    // Handling Click Events
    orderButtton.addEventListener("click", () => {
      swal({
        icon: "https://i.imgur.com/4NZ6uLY.jpg",
        title: "Thanks For Order !",
        text: "  ",
        timer: 2000,
        buttons: false
      });
    });

    orderSummaryButtton.addEventListener("click", () => {
      swal({
        icon: "warning",
        title: "Order Summary",
        text: "Work In Progress"
      });
    });
  },

  handleMarkerLost: function() {
    // Changing button div visibility
    var buttonDiv = document.getElementById("button-div");
    buttonDiv.style.display = "none";
  }
  
    handleOrder:function(uid,toy){
    firebase()
    .firestore()
    .collection("users")
    .doc(uid)
    .get()
    .then(doc=>{
        var details=doc.data();
        if(details["current_orders"][toy.id]){
            details["current_orders"][toy.id]["quantity"]+=1;

            var currentQuantity=details["current_orders"][toy.id][quantity];
            details["current_orders"][toy.id]["subtotal"]=currentQuantity*toy.price;
        }else{
            details["current_orders"][toy.id]={
                item:toy.toy_name,
                price:toy.price,
                quantity:1,
                subtotal:toy.price*1
            };
        }
        details.total_bill+=toy.price;
        firebase
        .firestore()
        .collection("users")
        .doc(doc.id)
        .update(details)
    });    
},
handleRatings:function(toy){
  document.getElementById("rating-modal-div").style.display="flex";
  document.getElementById("rating-input").value="0";

  var saveRatingButton=document.getElementById("save-rating-button");
  saveRatingButton.addEventListener("click",()=>{
    document.getElementById("rating-modal-div").style.display="none";
    var rating=document.getElementById("rating-input").value;

    firebase
    .firestore()
    .collection("toys")
    .doc(toy.id)
    .update({
      rating:rating
    })
    .then(()=>{
      swal({
        icon:"success",
        title:"thanks for the rating!",
        text:"We hope you like the toy!"
        timer:2500,
        button:false,
      });
    },
  });
}
});

