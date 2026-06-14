import type { VideoFeedItem } from "@/types/video";

export const mockVideos: VideoFeedItem[] = [
  {
    id: "1",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Big Buck Bunny",
    description:
      "Một chú thỏ dễ thương trong thung lũng xanh — clip demo cổ điển từ W3Schools.",
    likesCount: 12400,
  },
  {
    id: "2",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "MDN Examples",
    description:
      "Video mẫu CC0 từ Mozilla — dùng để test player và auto-play khi cuộn.",
    likesCount: 8750,
  },
  {
    id: "3",
    videoUrl: "https://media.w3.org/2010/05/sintel/trailer.mp4",
    authorName: "Blender Foundation",
    description:
      "Trailer ngắn Sintel — kiểm tra hiệu năng với video dài hơn một chút.",
    likesCount: 45200,
  },
  {
    id: "4",
    videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
    authorName: "Nature Vibes",
    description:
      "Cuộc sống hoang dã qua góc nhìn mới — thích hợp test layout full-screen 9:16.",
    likesCount: 3180,
  },
  {
    id: "5",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "Creative Studio",
    description:
      "Nội dung sáng tạo ngắn — thử nút Like và cập nhật likesCount khi click.",
    likesCount: 967,
  },
];
