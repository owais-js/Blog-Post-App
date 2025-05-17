import React from "react";
import {
  Box,
  List,
  ListItem,
  ListItemAvatar,
  Avatar,
  ListItemText,
  Typography,
  Badge,
  Divider,
  IconButton,
  Menu,
  MenuItem,
  Button
} from "@mui/material";
import {
  Notifications as NotificationsIcon,
  Close as CloseIcon,
  Favorite as LikeIcon,
  Comment as CommentIcon,
  Bookmark as SaveIcon,
  Share as ShareIcon,
  PersonAdd as FollowIcon
} from "@mui/icons-material";
import { createTheme, ThemeProvider } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#1f4037",
      light: "#99f2c8",
      dark: "#173029",
      contrastText: "#ffffff"
    },
    secondary: {
      main: "#f8b400",
      contrastText: "#1f4037"
    }
  },
  typography: {
    fontFamily: '"Montserrat", sans-serif',
  }
});

const dummyNotifications = [
  {
    id: 1,
    user: "Sarah Johnson",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    action: "liked",
    type: "like",
    target: "your recent post",
    time: "2 mins ago",
    read: false
  },
  {
    id: 2,
    user: "Mike Chen",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    action: "commented on",
    type: "comment",
    target: "your article",
    time: "15 mins ago",
    read: false
  },
  {
    id: 3,
    user: "Emma Wilson",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    action: "saved",
    type: "save",
    target: "your blog post",
    time: "1 hour ago",
    read: true
  },
  {
    id: 4,
    user: "David Kim",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    action: "shared",
    type: "share",
    target: "your story",
    time: "3 hours ago",
    read: true
  },
  {
    id: 5,
    user: "Lisa Wong",
    avatar: "https://randomuser.me/api/portraits/women/23.jpg",
    action: "started following you",
    type: "follow",
    time: "1 day ago",
    read: true
  }
];

const getActionIcon = (type) => {
  switch (type) {
    case "like":
      return <LikeIcon color="error" fontSize="small" />;
    case "comment":
      return <CommentIcon color="primary" fontSize="small" />;
    case "save":
      return <SaveIcon color="secondary" fontSize="small" />;
    case "share":
      return <ShareIcon color="info" fontSize="small" />;
    case "follow":
      return <FollowIcon color="success" fontSize="small" />;
    default:
      return null;
  }
};

function Notification() {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [notifications, setNotifications] = React.useState(dummyNotifications);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const markAsRead = (id) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <ThemeProvider theme={theme}>
      <Box>
        <IconButton
          color="inherit"
          aria-label="notifications"
          onClick={handleClick}
          sx={{ position: 'relative' }}
        >
          <Badge badgeContent={unreadCount} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>

        <Menu
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          PaperProps={{
            sx: {
              width: 400,
              maxWidth: '100%',
              borderRadius: 3,
              boxShadow: 3,
              mt: 1.5
            }
          }}
        >
          <Box sx={{ px: 2, py: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            <Typography variant="h6" color="primary.main" fontWeight={600}>
              Notifications
            </Typography>
            <Box>
              <Button
                size="small"
                onClick={markAllAsRead}
                sx={{ mr: 1 }}
              >
                Mark all as read
              </Button>
              <IconButton size="small" onClick={handleClose}>
                <CloseIcon fontSize="small" />
              </IconButton>
            </Box>
          </Box>

          <Divider />

          <List sx={{ py: 0, maxHeight: 400, overflow: 'auto' }}>
            {notifications.map((notification) => (
              <React.Fragment key={notification.id}>
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    bgcolor: notification.read ? 'inherit' : 'action.hover',
                    '&:hover': { bgcolor: 'action.selected' }
                  }}
                >
                  <ListItemAvatar>
                    <Badge
                      overlap="circular"
                      anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                      badgeContent={getActionIcon(notification.type)}
                    >
                      <Avatar alt={notification.user} src={notification.avatar} />
                    </Badge>
                  </ListItemAvatar>
                  <ListItemText
                    primary={
                      <Typography fontWeight={notification.read ? 400 : 600}>
                        {notification.user} {notification.action} {notification.target || ''}
                      </Typography>
                    }
                    secondary={
                      <Typography
                        variant="caption"
                        color="text.secondary"
                      >
                        {notification.time}
                      </Typography>
                    }
                  />
                  {!notification.read && (
                    <IconButton
                      size="small"
                      onClick={() => markAsRead(notification.id)}
                      sx={{ ml: 1 }}
                    >
                      <CloseIcon fontSize="small" />
                    </IconButton>
                  )}
                </ListItem>
                <Divider variant="inset" component="li" />
              </React.Fragment>
            ))}
          </List>

          <Box sx={{ p: 1, textAlign: 'center' }}>
            <Button color="primary" size="small">
              View All Notifications
            </Button>
          </Box>
        </Menu>
      </Box>
    </ThemeProvider>
  );
}

export default Notification;