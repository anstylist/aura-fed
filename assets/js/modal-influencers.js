function setInfluencersModalsBehavior() {
  const banner = document.querySelector("#banner-influencers")
  const influencerModals = banner.querySelectorAll(".influencers-modal")

  influencerModals.forEach(modal => {
    modal.addEventListener("shown.bs.modal", (evt) => {
      document.querySelector("body").setAttribute("scroll", "no")
      const myVideo = evt.target.querySelector("video")
      myVideo.play()
    });
    
    modal.addEventListener("hidden.bs.modal", (evt) => {
      document.querySelector("body").removeAttribute("scroll")
      const myVideo = evt.target.querySelector("video")
      myVideo.pause();
      myVideo.currentTime = 0; 
    });
  })
}