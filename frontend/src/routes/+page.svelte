<script lang="ts">
  import { onMount } from 'svelte';

  let messages: { sender: 'user' | 'ai'; text: string }[] = [];
  let input = '';
  let isLoading = false;
  let sessionId: string | null = null;

  onMount(() => {
    messages = [
      { sender: 'ai', text: "👋 Hi! I'm your AI support agent. How can I help you today?" }
    ];
  });

  async function sendMessage(userMsg: string) {
    if (!userMsg.trim() || isLoading) return;
    input = '';
    isLoading = true;
    messages = [...messages, { sender: 'user', text: userMsg }];

    try {
      const res = await fetch('http://localhost:3001/api/chat/message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: userMsg, sessionId })
      });
      const data = await res.json();
      if (res.ok) {
        sessionId = data.sessionId;
        messages = [...messages, { sender: 'ai', text: data.reply }];
      }
    } catch (e) {
      messages = [...messages, { sender: 'ai', text: 'Sorry, our agent is having trouble right now. Please try again.' }];
    } finally {
      isLoading = false;
    }
  }

  function handleKeyDown(e: KeyboardEvent) {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage(input);
    }
  }

  // FAQ questions that trigger real chat
  const faqs = [
    "What’s your return policy?",
    "Do you ship to the USA?",
    "What are your support hours?"
  ];

  function askFaq(question: string) {
    sendMessage(question);
  }
</script>

<div style="max-width: 650px; margin: 30px auto; padding: 0 16px; font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif; color: #1f2937;">

  <!-- Main Heading -->
  <h1 style="font-size: 2rem; font-weight: 800; text-align: center; margin: 0 0 24px; color: #4f46e5;">
    SpurStore - AI Support Chat
  </h1>

  <!-- Chat History -->
  <div style="background: white; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); padding: 24px; margin-bottom: 24px;">
    <div style="background: #f9fafb; border-radius: 12px; padding: 16px; margin-bottom: 20px; min-height: 120px;">
      {#each messages as msg, i}
        <div style="margin-bottom: 12px; line-height: 1.5;">
          {#if msg.sender === 'ai'}
            <div style="color: #374151;">{msg.text}</div>
          {:else}
            <div style="text-align: right; color: #4f46e5; font-weight: 600;">{msg.text}</div>
          {/if}
        </div>
      {/each}

      {#if isLoading}
        <div style="color: #6b7280; font-style: italic;">Agent is thinking...</div>
      {/if}
    </div>

    <!-- FAQ Suggestions -->
    <div>
      <div style="font-weight: 600; margin-bottom: 12px; color: #374151;">Try asking:</div>
      <div style="display: flex; flex-wrap: wrap; gap: 8px;">
        {#each faqs as question}
          <button
            on:click={() => askFaq(question)}
            style="background: #f0f9ff; color: #0c4a6e; border: 1px solid #bae6fd; border-radius: 20px; padding: 6px 14px; font-size: 0.85rem; cursor: pointer; transition: all 0.2s;"
            disabled={isLoading}
          >
            {question}
          </button>
        {/each}
      </div>
    </div>
  </div>

  <!-- Input -->
  <div style="background: white; border-radius: 16px; box-shadow: 0 6px 20px rgba(0,0,0,0.08); padding: 20px;">
    <form on:submit|preventDefault={() => sendMessage(input)} style="display: flex; gap: 10px;">
      <input
        bind:value={input}
        on:keydown={handleKeyDown}
        type="text"
        placeholder="Type your message..."
        style="flex: 1; padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 8px; font-size: 14px;"
        disabled={isLoading}
      />
      <button
        type="submit"
        disabled={isLoading || !input.trim()}
        style="background: #4f46e5; color: white; border: none; border-radius: 8px; padding: 10px 20px; font-weight: 600;"
      >
        Send
      </button>
    </form>
  </div>

  <!-- Footer -->
  <div style="text-align: center; margin-top: 28px; color: #64748b; font-size: 0.9rem;">
    Ask me anything about our store, shipping, returns, or support!
  </div>
</div>