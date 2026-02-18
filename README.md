# Tasks.md

A custom fork of [BaldissaraMatheus/Tasks.md](https://github.com/BaldissaraMatheus/Tasks.md). With some additional automations and a retro Win98 theme.

## Features of this fork

- Custom Win98 inspired UI and theme
- Inbuilt Due date range filter
- Automatically assigns overdue tasks to a new "Overdue" lane with flashing red highlights.
- If cards are moved into a Lane with the title of "Done" the due date is automatically removed and the card is greyed out

## 🐋 Installation
### Docker

**1. Build the image**:

```
docker build -t mytasks .
```

**2. Spin up the container**:

```
docker run -d \
  --name tasks.md \
  -e PUID=1000 \
  -e PGID=1000 \
  -e TITLE="" \
  -e BASE_PATH="" \
  -e LOCAL_IMAGES_CLEANUP_INTERVAL=1440 \
  -p 8080:8080 \
  -v /path/to/tasks/:/tasks/ \
  -v /path/to/config/:/config/ \
  --restart unless-stopped \
  mytasks
```