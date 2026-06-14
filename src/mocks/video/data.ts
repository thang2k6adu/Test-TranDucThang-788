import type { VideoFeedItem } from "@/types/video";

export const mockVideos: VideoFeedItem[] = [
  {
    id: "1",
    videoUrl:
      "https://test-videos.co.uk/vids/bigbuckbunny/mp4/h264/1080/Big_Buck_Bunny_1080_10s_1MB.mp4",
    authorName: "Studio Bunny",
    description:
      "Big Buck Bunny 1080p — clip cinematic ngắn, test feed full-height và action rail.",
    likesCount: 128400,
  },
  {
    id: "2",
    videoUrl:
      "https://test-videos.co.uk/vids/sintel/mp4/h264/1080/Sintel_1080_10s_1MB.mp4",
    authorName: "Blender Films",
    description:
      "Sintel trailer 1080p — màu sắc và chuyển động đẹp hơn bản demo cũ.",
    likesCount: 89300,
  },
  {
    id: "3",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    authorName: "Nature CC0",
    description:
      "Hoa nở chậm — footage macro nhẹ nhàng từ Mozilla, hợp test object-cover.",
    likesCount: 54200,
  },
  {
    id: "4",
    videoUrl:
      "https://test-videos.co.uk/vids/sintel/mp4/h264/720/Sintel_720_10s_1MB.mp4",
    authorName: "Sky Tales",
    description:
      "Sintel 720p — phiên bản nhẹ hơn để kiểm tra tải nhanh khi scroll feed.",
    likesCount: 31750,
  },
  {
    id: "5",
    videoUrl:
      "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/friday.mp4",
    authorName: "MDN Examples",
    description:
      "Clip CC0 cổ điển — dùng test letterbox với video ngang và blur backdrop.",
    likesCount: 42100,
  },
  {
    id: "6",
    videoUrl:
      "https://www.learningcontainer.com/wp-content/uploads/2020/05/sample-mp4-file.mp4",
    authorName: "Sample Lab",
    description:
      "Sample MP4 chuẩn — fallback ổn định khi test like và pagination mock.",
    likesCount: 9670,
  },
];
