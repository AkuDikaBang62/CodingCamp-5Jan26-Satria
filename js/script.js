document.addEventListener('DOMContentLoaded', () => {
    // ================= ELEMENT =================
    const taskInput = document.getElementById('taskInput');
    const dateInput = document.getElementById('dateInput');
    const addBtn = document.getElementById('addBtn');
    const tableBody = document.getElementById('tableBody');
    const deleteAllBtn = document.getElementById('deleteAll');
    const filterBtns = document.querySelectorAll('.filter');

    let todos = [];
    let currentFilter = 'all';

    // ================= RENDER =================
    function renderTodos() {
        tableBody.innerHTML = '';
        let filtered = todos.filter(todo => {
            if (currentFilter === 'pending') return !todo.done;
            if (currentFilter === 'done') return todo.done;
            return true;
        });

        if (filtered.length === 0) {
            tableBody.innerHTML = '<p style="padding: 20px; color: #64748b; text-align: center;">No task found</p>';
            return;
        }

        filtered.forEach((todo) => {
            const row = document.createElement('div');
            row.className = 'table-row';
            row.innerHTML = `
                <span style="${todo.done ? 'text-decoration: line-through; opacity: 0.5' : ''}">${todo.task}</span>
                <span>${todo.date}</span>
                <span class="status ${todo.done ? 'done' : 'pending'}">${todo.done ? 'Done' : 'Pending'}</span>
                <span class="actions">
                    <button class="done-btn">${todo.done ? '↩' : '✔'}</button>
                    <button class="remove-btn">✖</button>
                </span>
            `;

            row.querySelector('.done-btn').onclick = () => {
                const target = todos.find(t => t.id === todo.id);
                target.done = !target.done;
                renderTodos();
            };

            row.querySelector('.remove-btn').onclick = () => {
                todos = todos.filter(t => t.id !== todo.id);
                renderTodos();
            };
            tableBody.appendChild(row);
        });
    }

    // ================= ADD =================
    addBtn.addEventListener('click', () => {
        if (!taskInput.value || !dateInput.value) {
            alert('Task dan tanggal wajib diisi!');
            return;
        }
        todos.push({ id: Date.now(), task: taskInput.value, date: dateInput.value, done: false });
        taskInput.value = '';
        dateInput.value = '';
        renderTodos();
    });

    // ================= LAINNYA =================
    deleteAllBtn.addEventListener('click', () => { 
        if(confirm("Hapus semua?")) { todos = []; renderTodos(); } 
    });

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            currentFilter = btn.dataset.filter;
            renderTodos();
        });
    });
});