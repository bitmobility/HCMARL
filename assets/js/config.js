// Video paths are relative to index.html. Recordings are stored in vedio/.
// Leave src empty to display a placeholder again.
// Optional: poster: "assets/images/highway-proposed-poster.webp"
window.PROJECT_CONFIG = {
  codeUrl: "",
  videos: {
    "highway-proposed": { src: "vedio/proposed.mp4", poster: "" },
    "highway-maddpg": { src: "vedio/maddpg.mp4", poster: "" },
    "highway-macpo": { src: "vedio/macpo.mp4", poster: "" },
    "highway-mappo-lag": { src: "vedio/mappo_lag.mp4", poster: "" },
    "highway-masac-rp": { src: "vedio/masac_rp.mp4", poster: "" },
    "roundabout": { src: "vedio/roundabout_proposed.mp4", poster: "" },
    "intersection": { src: "vedio/intersection_proposed.mp4", poster: "" },
    "highd": { src: "vedio/highD_proposed.mp4", poster: "" }
  }
};
