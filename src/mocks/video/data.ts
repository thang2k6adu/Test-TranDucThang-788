import type { VideoFeedItem } from "@/types/video";

export const mockVideos: VideoFeedItem[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "W3Schools",
    description:
      "Big Buck Bunny — video mẫu từ đề bài kiểm tra, test play/pause và auto-play khi scroll.",
    likesCount: 84200,
  },
  {
    id: "2",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "MDN Examples",
    description:
      "Clip CC0 cổ điển — dùng test letterbox với video ngang và blur backdrop.",
    likesCount: 42100,
  },
  {
    id: "3",
    videoUrl:
      "https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_1MB.mp4",
    authorName: "Blender Foundation",
    description:
      "Sintel 1080p — footage cinematic ngắn, thay thế link W3C bị chặn (403).",
    likesCount: 128400,
  },
  {
    id: "4",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    authorName: "Nature CC0",
    description:
      "Hoa nở chậm — footage macro nhẹ nhàng từ Mozilla, hợp test object-cover.",
    likesCount: 54200,
  },
  {
    id: "5",
    videoUrl:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4",
    authorName: "Studio Bunny",
    description:
      "Big Buck Bunny 1080p ngắn — clip nhẹ để kiểm tra tải nhanh khi scroll feed.",
    likesCount: 31750,
  },
];
