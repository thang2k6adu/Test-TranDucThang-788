### Tư duy

Feed có nhiều video cùng lúc trên DOM, nhưng chỉ nên phát một video đang nằm giữa màn hình. Thay vì lắng nghe sự kiện scroll liên tục, dùng Intersection Observer để hỏi trình duyệt: card nào đang hiển thị đủ lớn trong vùng cuộn?

flow:

1. **Phát hiện video đang xem** — observer theo dõi từng `VideoCard`; card hiển thị ≥ 60% và nhiều nhất → `activeVideoId`.
2. **Điều khiển phát/dừng** — mỗi `VideoPlayer` nhận `isActive`; active thì `play()`, không active thì `pause()`.
3. **Tách trách nhiệm** — scroller chỉ quyết _video nào active_; player chỉ quyết _play hay pause_. Click thủ công vẫn toggle độc lập.

Video đầu tiên được set active ngay khi load.

### Code

**1. Chọn video active** — `VideoFeedScroller.tsx`

```tsx
const observer = new IntersectionObserver(
  (entries) => {
    // Lấy card hiển thị ≥ 60%, ưu tiên intersectionRatio cao nhất
    setActiveVideoId(videoId);
  },
  { root: scroller, threshold: [0, 0.25, 0.5, 0.6, 0.75, 1] },
);
```

**2. Truyền xuống player** — `isActive={video.id === activeVideoId}`

**3. Play/Pause theo active** — `VideoPlayer.tsx`

```tsx
useEffect(() => {
  if (isActive) video.play();
  else video.pause();
}, [isActive]);
```
