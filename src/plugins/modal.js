(function () {
  function openModal(e) {
    var modalBtn = e.target;
    var modalWrapper = modalBtn.parentElement;
    modalWrapper.nextSibling.classList.add("active");
  }

  function pauseVideo(e) {
    // console.log(e);
    var video = e.target.nextSibling.getElementsByTagName("iframe")[0]
      .contentWindow;
    var action = "pauseVideo";
    video.postMessage(
      '{"event":"command","func":"' + action + '","args":""}',
      "*"
    );
  }

  // OPEN modal
  document.addEventListener("click", function (e) {
    //check is the right element clicked
    if (!e.target.matches(".btn-modal")) return;
    else {
      //select right modal from id-data
      var modal = document.querySelectorAll("#" + e.target.dataset.id);

      Array.prototype.forEach.call(modal, function (el) {
        //add active class on modal
        // toggleVideo();
        openModal(e);
      });
    }
  });

  // CLOSE modal
  document.addEventListener("click", function (e) {
    if (!e.target.matches(".m-close")) return;
    else {
      var modal = e.target.parentElement.parentElement;
      pauseVideo(e);
      modal.classList.remove("active");
    }
  });
})();
