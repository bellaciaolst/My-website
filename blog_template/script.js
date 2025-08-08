document.addEventListener('DOMContentLoaded', () => {
    const container = document.getElementById('post-container');

    // 主题切换
    const themeToggle = document.getElementById('theme-toggle');
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark');
        themeToggle.textContent = '🌞';
    }
    themeToggle.addEventListener('click', () => {
        document.body.classList.toggle('dark');
        const isDark = document.body.classList.contains('dark');
        localStorage.setItem('theme', isDark ? 'dark' : 'light');
        themeToggle.textContent = isDark ? '🌞' : '🌙';
    });

    // 加载文章
    fetch('posts.json')
        .then(res => res.json())
        .then(data => {
            data.posts.sort((a, b) => new Date(b.date) - new Date(a.date));
            data.posts.forEach(post => {
                const postEl = document.createElement('div');
                postEl.className = 'post';
                postEl.innerHTML = `
                    <h3>${post.title}</h3>
                    <small>${post.date}</small>
                    <p>${post.content}</p>
                    ${post.appleMusicEmbed ? post.appleMusicEmbed : ''}
                `;
                container.appendChild(postEl);
            });
        })
        .catch(err => {
            container.innerHTML = '<p>加载文章失败。</p>';
            console.error(err);
        });
});
