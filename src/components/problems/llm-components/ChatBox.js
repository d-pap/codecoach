// ChatBox.js
import React, {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  useCallback,
  Suspense,
} from 'react';
import { Box, Paper, Typography, Tooltip } from '@mui/material';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import { useTheme } from '@mui/material/styles';
import SendChat from './AIChat';
import DOMPurify from 'dompurify';
import CenteredCircleLoader from '../../utility/CenteredLoader';

// Lazy load child components
const Messages = React.lazy(() => import('./Messages'));
const ChatInput = React.lazy(() => import('./ChatInput'));
const ChatButtons = React.lazy(() => import('./ChatButtons'));

// Function to clear chat history from localStorage
const clearChatHistory = (problemId) => {
  localStorage.removeItem(`chatHistory-${problemId}`);
};

const ChatBox = ({
  problem,
  chatHistory,
  setChatHistory,
  chatCount,
  setChatCount,
  initialScrollPosition,
  onScrollPositionChange,
  currentCode,
  currentLanguage,
}) => {
  const theme = useTheme();
  const [input, setInput] = useState('');
  const [includeCode, setIncludeCode] = useState(false);
  const [isLoading, setIsLoading] = useState(false); // Manage isLoading here

  const MAX_CHAT_COUNT = 20;

  // Ref for Scrollable Container
  const scrollContainerRef = useRef(null);

  const scrollToBottom = useCallback(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop =
        scrollContainerRef.current.scrollHeight;
    }
  }, []);

  useLayoutEffect(() => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollTop = initialScrollPosition;
    }
  }, [initialScrollPosition]);

  useEffect(() => {
    // Capture Scroll Position before Unmounting
    return () => {
      if (scrollContainerRef.current) {
        onScrollPositionChange(scrollContainerRef.current.scrollTop);
      }
    };
  }, [onScrollPositionChange]);

  // Function to sanitize input using DOMPurify
  const sanitizeInput = (dirtyInput) => {
    return DOMPurify.sanitize(dirtyInput);
  };

  // Function to sanitize AI response using DOMPurify
  const sanitizeResponse = (dirtyResponse) => {
    return DOMPurify.sanitize(dirtyResponse);
  };

  // Function to send a message to the AI model
  const handleSend = async (command = 'user') => {
    if (command === 'user' && input.trim() === '') return;

    let message = '';

    // Limit the number of chats to prevent abuse
    if (chatCount >= MAX_CHAT_COUNT) {
      alert('You have reached the maximum number of messages for today.');
      return;
    } else if (command === 'user') {
      // Sanitize user input
      const sanitizedInput = sanitizeInput(input.trim());
      message = `${sanitizedInput}\n`;
      if (includeCode && currentCode != null) {
        const sanitizedCode = sanitizeInput(currentCode);
        message += `\n\nUser Code:\n\n${sanitizeInput(
          currentLanguage
        )}\n\n\`\`\`\n${sanitizedCode}\n\`\`\``;
      }
      // Increment chat count
      setChatCount((prevCount) => prevCount + 1);
    } else if (command === 'hint') {
      message = 'Requesting a hint...';
      setChatCount((prevCount) => prevCount + 1);
    } else if (command === 'solution') {
      message = 'Requesting a solution...';
      setChatCount((prevCount) => prevCount + 1);
    } else {
      console.error('Invalid command:', command);
      return;
    }

    // Create a new history object with sanitized user message
    const newHistory = {
      ...chatHistory,
      data: [
        ...chatHistory.data,
        { role: 'user', content: sanitizeInput(message) },
      ],
    };
    setChatHistory(newHistory);

    if (command === 'user') {
      setInput('');
    }
    setIsLoading(true);

    try {
      const conversation_id = chatHistory.conversation_id;

      const query = await SendChat(
        sanitizeInput(problem.title),
        sanitizeInput(problem.description),
        sanitizeInput(message),
        conversation_id,
        command,
        sanitizeInput(currentLanguage)
      );

      // Sanitize AI response
      const sanitizedResponse = sanitizeResponse(query.response);

      const updatedHistory = {
        ...newHistory,
        data: [
          ...newHistory.data,
          { role: 'assistant', content: sanitizedResponse },
        ],
      };

      if (query.conversation_id) {
        updatedHistory.conversation_id = query.conversation_id;
      }

      setChatHistory(updatedHistory);

      // Scroll to bottom after state update
      setTimeout(scrollToBottom, 100);
    } catch (error) {
      console.error('Failed to send chat:', error);
      const updatedHistory = {
        ...newHistory,
        data: [
          ...newHistory.data,
          {
            role: 'assistant',
            content: sanitizeResponse('Failed to get response from model'),
          },
        ],
      };
      setChatHistory(updatedHistory);
    } finally {
      setIsLoading(false); // Ensure isLoading is set to false
    }

    setTimeout(scrollToBottom, 100);
  };

  // Function to delete chat history
  const handleDelete = () => {
    clearChatHistory(problem._id);
    setChatHistory({ conversation_id: null, data: [] });
    setInput('');
  };

  return (
    <Paper
      elevation={3}
      sx={{
        p: 1,
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        boxShadow: 'none',
      }}
    >
      {/* Header Section */}
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          mb: 1,
        }}
      >
        <Tooltip title="During development, the number of AI messages is limited per day. Each hint, solution, and user message costs 1 run. You can see how many runs you have left in the input field placeholder text.">
          <div>
            <InfoRoundedIcon sx={{ color: 'text.secondary' }} />
          </div>
        </Tooltip>
        <Typography variant="h3" sx={{ flexGrow: 1, textAlign: 'center' }}>
          codecoach
        </Typography>
      </Box>

      {/* Scrollable content including Messages and ChatButtons */}
      <Box
        sx={{
          flexGrow: 1,
          overflowY: 'auto',
          display: 'flex',
          flexDirection: 'column',
        }}
        ref={scrollContainerRef}
      >
        {/* Messages Component */}
        <Suspense fallback={<CenteredCircleLoader />}>
          <Box sx={{ flexGrow: 1 }}>
            <Messages chatHistory={chatHistory} isLoading={isLoading} />
          </Box>
        </Suspense>

        {/* ChatButtons Component */}
        <Suspense fallback={<CenteredCircleLoader />}>
          <Box sx={{ flexShrink: 0 }}>
            <ChatButtons
              handleSend={handleSend}
              isLoading={isLoading}
              chatCount={chatCount}
              MAX_CHAT_COUNT={MAX_CHAT_COUNT}
              includeCode={includeCode}
              setIncludeCode={setIncludeCode}
            />
          </Box>
        </Suspense>
      </Box>

      {/* ChatInput Component (outside the scrollable area) */}
      <Suspense fallback={<CenteredCircleLoader />}>
        <Box sx={{ flexShrink: 0 }}>
          <ChatInput
            input={input}
            setInput={setInput}
            handleSend={handleSend}
            isLoading={isLoading}
            chatCount={chatCount}
            MAX_CHAT_COUNT={MAX_CHAT_COUNT}
            handleDelete={handleDelete}
          />
        </Box>
      </Suspense>
    </Paper>
  );
};

export default ChatBox;
