# Next.js Video Feed

Next.js 16 App Router demo — vertical video feed kiểu TikTok với Redux và shadcn/ui.

## Stack

- **Next.js 16** + React 19 + App Router
- **Redux Toolkit** + Redux Persist (theme + video likes)
- **Tailwind CSS v3** + shadcn/ui
- **Axios** (mock video API mặc định)

## Quick Start

```bash
npm install
npm run dev
```

Mở [http://localhost:3000/explore](http://localhost:3000/explore) — không cần đăng nhập.

## Structure

```
src/
├── app/           # Routes
├── views/         # Page views (Home, VideoFeed)
├── components/    # Shared UI + video feed components
├── store/         # Redux (theme + video)
├── mocks/         # Mock video data
└── ...
```

## Routes

| Path       | Description         |
| ---------- | ------------------- |
| `/`        | Home                |
| `/explore` | Vertical video feed |
| `/profile` | Profile placeholder |

## Video feed (`/explore`)

Trang feed video dọc kiểu TikTok: mỗi card tỷ lệ 9:16, cuộn snap từng video, action rail bên phải (Like, Comment, Bookmark, Share).

### Play/Pause khi cuộn (Intersection Observer)

Logic nằm ở `VideoFeedScroller` và `VideoPlayer`:

1. **`VideoFeedScroller`** gắn một `IntersectionObserver` với `root` là container cuộn (`overflow-y-auto`).
2. Mỗi `VideoCard` có `data-video-id`; observer theo dõi tỷ lệ hiển thị của từng card.
3. Card nào **hiển thị ≥ 60%** và có tỷ lệ cao nhất được chọn làm `activeVideoId`.
4. **`VideoPlayer`** nhận prop `isActive`:
   - `isActive === true` → gọi `video.play()` (muted + `playsInline` để trình duyệt cho autoplay).
   - `isActive === false` → gọi `video.pause()`.
5. **Click thủ công** vẫn toggle play/pause độc lập, kèm animation icon pop; autoplay không hiện indicator.

Video đầu tiên được active ngay khi load để tự phát khi vào trang.

### Navigation

- **Desktop (≥ md):** sidebar trái (`CollapsibleSidebar`) — Home, Khám phá, Profile.
- **Mobile:** bottom nav (`BottomNav`) — cùng 3 mục, sidebar ẩn.

## Scripts

```bash
npm run dev
npm run build
npm run lint
npm run type-check
```
