// "use client";
// import { hightlightsSlides } from "@/constants";
// import React, { useEffect, useRef, useState } from "react";
// import gsap from "gsap";
// import Image from "next/image";
// import { pauseImg, playImg, replayImg } from "../app/utils";
// import { useGSAP } from "@gsap/react";
// import { ScrollTrigger } from "gsap/all";

// gsap.registerPlugin(ScrollTrigger);

// interface VideoState {
//   isEnd: boolean;
//   startPlay: boolean;
//   videoId: number;
//   isLastVideo: boolean;
//   isPlaying: boolean;
// }

// interface HighlightSlide {
//   id: number;
//   video: string;
//   textLists: string[];
// }

// const VideoCarousel: React.FC = () => {
//   const videoRef = useRef<HTMLVideoElement[]>([]);
//   const videoSpanRef = useRef<HTMLSpanElement[]>([]);
//   const videoDivRef = useRef<HTMLSpanElement[]>([]);

//   const [video, setVideo] = useState<VideoState>({
//     isEnd: false,
//     startPlay: false,
//     videoId: 0,
//     isLastVideo: false,
//     isPlaying: false,
//   });

//   const [loadedData, setLoadedData] = useState<boolean[]>([]);
//   const { isEnd, isLastVideo, startPlay, isPlaying, videoId } = video;

//   useGSAP(() => {
//     gsap.to("#video", {
//       scrollTrigger: {
//         trigger: "#video",
//         toggleActions: "restart none none none",
//       },
//       onComplete: () => {
//         setVideo((prev) => ({
//           ...prev,
//           startPlay: true,
//           isPlaying: true,
//         }));
//       },
//     });
//     gsap.to("#slider", {
//       transform: `translateX(${-100 * videoId}%)`,
//       duration: 2,
//       ease: "power2.inOut",
//     });
//   }, [isEnd, videoId]);

//   useEffect(() => {
//     if (loadedData.length > 3) {
//       if (!isPlaying) {
//         videoRef.current[videoId]?.pause();
//       } else {
//         startPlay && videoRef.current[videoId]?.play();
//       }
//     }
//   }, [startPlay, videoId, isPlaying, loadedData]);

//   useEffect(() => {
//     let currentProgress = 0;
//     const span = videoSpanRef.current;
//     if (span[videoId]) {
//       // Animate the progress of the video
//       const anim = gsap.to(span[videoId], {
//         onUpdate: () => {
//           const progress = Math.ceil(anim.progress() * 100);
//           if (progress !== currentProgress) {
//             currentProgress = progress;
//             gsap.to(videoDivRef.current[videoId], {
//               width:
//                 window.innerWidth < 760
//                   ? "10vw"
//                   : window.innerWidth < 1200
//                     ? "10vw"
//                     : "4vw",
//             });
//             gsap.to(span[videoId], {
//               width: `${currentProgress}%`,
//               backgroundColor: "white",
//             });
//           }
//         },
//         onComplete: () => {
//           if (isPlaying) {
//             gsap.to(videoDivRef.current[videoId], {
//               width: "12px",
//             });
//             gsap.to(span[videoId], {
//               backgroundColor: "#afafaf",
//             });
//           }
//         },
//       });
//       if (videoId === 0) {
//         anim.restart();
//       }
//       const animUpdate = () => {
//         anim.progress(
//           videoRef.current[videoId].currentTime /
//             hightlightsSlides[videoId].videoDuration,
//         );
//       };
//       if (isPlaying) {
//         gsap.ticker.add(animUpdate);
//       } else {
//         gsap.ticker.remove(animUpdate);
//       }
//     }
//   }, [videoId, startPlay]);

//   const handleLoadedMetadata = () => setLoadedData((prev) => [...prev, true]);

//   const handleProcess = (type: string, i: number = 0): void => {
//     switch (type) {
//       case "video-end":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isEnd: true,
//           videoId: i + 1,
//         }));
//         break;
//       case "video-last":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isLastVideo: true,
//         }));
//         break;
//       case "video-reset":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isLastVideo: false,
//           videoId: 0,
//         }));
//         break;
//       case "play":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isPlaying: !isPlaying,
//         }));
//         break;
//       case "pause":
//         setVideo((prevVideo) => ({
//           ...prevVideo,
//           isPlaying: !isPlaying,
//         }));
//         break;
//       default:
//         break;
//     }
//   };

//   return (
//     <>
//       <div className="flex items-center">
//         {hightlightsSlides.map((list: HighlightSlide, i: number) => (
//           <div key={list.id} id="slider" className="pr-10 sm:pr-20">
//             <div className="video-carousel_container">
//               <div className="flex-center size-full overflow-hidden rounded-3xl bg-black">
//                 <video
//                   autoPlay
//                   id="video"
//                   playsInline
//                   preload="auto"
//                   muted
//                   className={`${
//                     list.id === 2 && "translate-x-44"
//                   } pointer-events-none`}
//                   ref={(el) => {
//                     if (el) videoRef.current[i] = el;
//                   }}
//                   onPlay={() => {
//                     setVideo((prevVideo) => ({
//                       ...prevVideo,
//                       isPlaying: true,
//                     }));
//                   }}
//                   onLoadedMetadata={() => handleLoadedMetadata()}
//                   onEnded={() =>
//                     i !== 3
//                       ? handleProcess("video-end", i)
//                       : handleProcess("video-last")
//                   }
//                 >
//                   <source src={list.video} type="video/mp4" />
//                 </video>
//               </div>
//               <div className="absolute left-[5%] top-12">
//                 {list.textLists.map((text, index) => (
//                   <p key={index} className="text-xl font-medium md:text-2xl">
//                     {text}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         ))}
//       </div>
//       <div className="flex-center relative mt-10">
//         <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
//           {videoRef.current.map((_, i) => (
//             <span
//               className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200"
//               key={i}
//               ref={(el) => {
//                 if (el) videoDivRef.current[i] = el;
//               }}
//             >
//               <span
//                 className="absolute size-full rounded-full"
//                 ref={(el) => {
//                   if (el) videoSpanRef.current[i] = el;
//                 }}
//               />
//             </span>
//           ))}
//         </div>
//         <button className="control-btn">
//           <Image
//             height={18}
//             width={18}
//             src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
//             alt={isLastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}
//             onClick={
//               isLastVideo
//                 ? () => handleProcess("video-reset")
//                 : !isPlaying
//                   ? () => handleProcess("play")
//                   : () => handleProcess("pause")
//             }
//           />
//         </button>
//       </div>
//     </>
//   );
// };

// export default VideoCarousel;

"use client";
import { hightlightsSlides } from "@/constants";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import Image from "next/image";
import { pauseImg, playImg, replayImg } from "../app/utils";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";
import { useMediaQuery } from "react-responsive";

gsap.registerPlugin(ScrollTrigger);

interface VideoState {
  isEnd: boolean;
  startPlay: boolean;
  videoId: number;
  isLastVideo: boolean;
  isPlaying: boolean;
}

interface HighlightSlide {
  id: number;
  video: string;
  textLists: string[];
}

const VideoCarousel: React.FC = () => {
  const videoRef = useRef<HTMLVideoElement[]>([]);
  const videoSpanRef = useRef<HTMLSpanElement[]>([]);
  const videoDivRef = useRef<HTMLSpanElement[]>([]);

  const [video, setVideo] = useState<VideoState>({
    isEnd: false,
    startPlay: false,
    videoId: 0,
    isLastVideo: false,
    isPlaying: false,
  });

  const [loadedData, setLoadedData] = useState<boolean[]>([]);
  const { isEnd, isLastVideo, startPlay, isPlaying, videoId } = video;

  // Media queries using react-responsive
  const isSmallScreen = useMediaQuery({ query: "(max-width: 760px)" });
  const isMediumScreen = useMediaQuery({ query: "(max-width: 1200px)" });
  console.log("hello",isSmallScreen)

  useGSAP(() => {
    gsap.to("#video", {
      scrollTrigger: {
        trigger: "#video",
        toggleActions: "restart none none none",
      },
      onComplete: () => {
        setVideo((prev) => ({
          ...prev,
          startPlay: true,
          isPlaying: true,
        }));
      },
    });
    gsap.to("#slider", {
      transform: `translateX(${-100 * videoId}%)`,
      duration: 2,
      ease: "power2.inOut",
    });
  }, [isEnd, videoId]);

  useEffect(() => {
    if (loadedData.length > 3) {
      if (!isPlaying) {
        videoRef.current[videoId]?.pause();
      } else {
        startPlay && videoRef.current[videoId]?.play();
      }
    }
  }, [startPlay, videoId, isPlaying, loadedData]);

  useEffect(() => {
    let currentProgress = 0;
    const span = videoSpanRef.current;
    if (span[videoId]) {
      // Animate the progress of the video
      const anim = gsap.to(span[videoId], {
        onUpdate: () => {
          const progress = Math.ceil(anim.progress() * 100);
          if (progress !== currentProgress) {
            currentProgress = progress;

            const width = isSmallScreen
              ? "10vw"
              : isMediumScreen
              ? "10vw"
              : "4vw";

            gsap.to(videoDivRef.current[videoId], {
              width,
            });
            gsap.to(span[videoId], {
              width: `${currentProgress}%`,
              backgroundColor: "white",
            });
          }
        },
        onComplete: () => {
          if (isPlaying) {
            gsap.to(videoDivRef.current[videoId], {
              width: "12px",
            });
            gsap.to(span[videoId], {
              backgroundColor: "#afafaf",
            });
          }
        },
      });
      if (videoId === 0) {
        anim.restart();
      }
      const animUpdate = () => {
        anim.progress(
          videoRef.current[videoId].currentTime /
            hightlightsSlides[videoId].videoDuration,
        );
      };
      if (isPlaying) {
        gsap.ticker.add(animUpdate);
      } else {
        gsap.ticker.remove(animUpdate);
      }
    }
  }, [videoId, startPlay, isSmallScreen, isMediumScreen]);

  const handleLoadedMetadata = () => setLoadedData((prev) => [...prev, true]);

  const handleProcess = (type: string, i: number = 0): void => {
    switch (type) {
      case "video-end":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isEnd: true,
          videoId: i + 1,
        }));
        break;
      case "video-last":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: true,
        }));
        break;
      case "video-reset":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isLastVideo: false,
          videoId: 0,
        }));
        break;
      case "play":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !isPlaying,
        }));
        break;
      case "pause":
        setVideo((prevVideo) => ({
          ...prevVideo,
          isPlaying: !isPlaying,
        }));
        break;
      default:
        break;
    }
  };

  return (
    <>
      <div className="flex items-center">
        {hightlightsSlides.map((list: HighlightSlide, i: number) => (
          <div key={list.id} id="slider" className="pr-10 sm:pr-20">
            <div className="video-carousel_container">
              <div className="flex-center size-full overflow-hidden rounded-3xl bg-black">
                <video
                  autoPlay
                  id="video"
                  playsInline
                  preload="auto"
                  muted
                  className={`${
                    list.id === 2 && "translate-x-44"
                  } pointer-events-none`}
                  ref={(el) => {
                    if (el) videoRef.current[i] = el;
                  }}
                  onPlay={() => {
                    setVideo((prevVideo) => ({
                      ...prevVideo,
                      isPlaying: true,
                    }));
                  }}
                  onLoadedMetadata={() => handleLoadedMetadata()}
                  onEnded={() =>
                    i !== 3
                      ? handleProcess("video-end", i)
                      : handleProcess("video-last")
                  }
                >
                  <source src={list.video} type="video/mp4" />
                </video>
              </div>
              <div className="absolute left-[5%] top-12">
                {list.textLists.map((text, index) => (
                  <p key={index} className="text-xl font-medium md:text-2xl">
                    {text}
                  </p>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-center relative mt-10">
        <div className="flex-center rounded-full bg-gray-300 px-7 py-5 backdrop-blur">
          {videoRef.current.map((_, i) => (
            <span
              className="relative mx-2 size-3 cursor-pointer rounded-full bg-gray-200"
              key={i}
              ref={(el) => {
                if (el) videoDivRef.current[i] = el;
              }}
            >
              <span
                className="absolute size-full rounded-full"
                ref={(el) => {
                  if (el) videoSpanRef.current[i] = el;
                }}
              />
            </span>
          ))}
        </div>
        <button className="control-btn">
          <Image
            height={18}
            width={18}
            src={isLastVideo ? replayImg : !isPlaying ? playImg : pauseImg}
            alt={isLastVideo ? "Replay" : !isPlaying ? "Play" : "Pause"}
            onClick={
              isLastVideo
                ? () => handleProcess("video-reset")
                : !isPlaying
                  ? () => handleProcess("play")
                  : () => handleProcess("pause")
            }
          />
        </button>
      </div>
    </>
  );
};

export default VideoCarousel;
