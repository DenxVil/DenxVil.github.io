// Project Reaction System with localStorage persistence
// Allows users to react to projects with Like, Love, Fire, Star

(function() {
    'use strict';

    const STORAGE_KEY = 'denvil_project_reactions';
    const REACTIONS = [
        { emoji: '👍', name: 'like', label: 'Like' },
        { emoji: '❤️', name: 'love', label: 'Love' },
        { emoji: '🔥', name: 'fire', label: 'Fire' },
        { emoji: '⭐', name: 'star', label: 'Star' }
    ];

    function initReactionSystem() {
        const reactionContainers = document.querySelectorAll('.reaction-container');
        if (reactionContainers.length === 0) return;

        reactionContainers.forEach(container => {
            const projectId = container.getAttribute('data-project-id');
            if (!projectId) return;

            createReactionButtons(container, projectId);
            loadReactions(container, projectId);
        });
    }

    function createReactionButtons(container, projectId) {
        const reactionsDiv = document.createElement('div');
        reactionsDiv.className = 'reactions-wrapper';
        
        REACTIONS.forEach(reaction => {
            const button = document.createElement('button');
            button.className = 'reaction-btn';
            button.setAttribute('data-reaction', reaction.name);
            button.setAttribute('data-project', projectId);
            button.setAttribute('aria-label', reaction.label);
            button.innerHTML = `
                <span class="reaction-emoji">${reaction.emoji}</span>
                <span class="reaction-count">0</span>
            `;
            
            button.addEventListener('click', () => handleReaction(button, projectId, reaction.name));
            reactionsDiv.appendChild(button);
        });
        
        container.appendChild(reactionsDiv);
    }

    function handleReaction(button, projectId, reactionName) {
        const reactions = getStoredReactions();
        
        if (!reactions[projectId]) {
            reactions[projectId] = {};
        }
        
        // Toggle reaction
        if (reactions[projectId][reactionName]) {
            reactions[projectId][reactionName] = false;
            button.classList.remove('active');
        } else {
            reactions[projectId][reactionName] = true;
            button.classList.add('active');
            
            // Add animation
            button.classList.add('reacted');
            setTimeout(() => button.classList.remove('reacted'), 300);
        }
        
        saveReactions(reactions);
        updateReactionCount(button, projectId, reactionName);
    }

    function loadReactions(container, projectId) {
        const reactions = getStoredReactions();
        const projectReactions = reactions[projectId] || {};
        
        REACTIONS.forEach(reaction => {
            const button = container.querySelector(`[data-reaction="${reaction.name}"]`);
            if (button && projectReactions[reaction.name]) {
                button.classList.add('active');
            }
            updateReactionCount(button, projectId, reaction.name);
        });
    }

    function updateReactionCount(button, projectId, reactionName) {
        const reactions = getStoredReactions();
        const isActive = reactions[projectId]?.[reactionName] || false;
        const countSpan = button.querySelector('.reaction-count');
        
        // For demo purposes, show 1 if active, 0 if not
        // In a real app, this would be fetched from a server
        countSpan.textContent = isActive ? '1' : '0';
    }

    function getStoredReactions() {
        try {
            const stored = localStorage.getItem(STORAGE_KEY);
            return stored ? JSON.parse(stored) : {};
        } catch (e) {
            console.error('Error reading reactions from localStorage:', e);
            return {};
        }
    }

    function saveReactions(reactions) {
        try {
            localStorage.setItem(STORAGE_KEY, JSON.stringify(reactions));
        } catch (e) {
            console.error('Error saving reactions to localStorage:', e);
        }
    }

    // Initialize on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', initReactionSystem);
    } else {
        initReactionSystem();
    }
})();
