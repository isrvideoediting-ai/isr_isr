// admin.js - simple client management for receptionist page

document.addEventListener('DOMContentLoaded', () => {
    // only run on admin/reception page
    if (!document.body.classList.contains('admin')) return;

    const clientTableBody = document.querySelector('#clientTable tbody');
    const addBtn = document.querySelector('#addClientBtn');
    const modal = document.querySelector('#clientModal');
    const modalTitle = document.querySelector('#modalTitle');
    const clientForm = document.querySelector('#clientForm');
    const cancelBtn = document.querySelector('#cancelBtn');

    let clients = [];

    function loadClients() {
        const stored = localStorage.getItem('clients');
        clients = stored ? JSON.parse(stored) : [];
        renderTable();
    }

    function saveClients() {
        localStorage.setItem('clients', JSON.stringify(clients));
    }

    function projectLabel(val) {
        switch (val) {
            case 'ads': return 'Publicité (TikTok/Meta)';
            case 'branding': return 'Branding & Logo';
            case 'realestate': return 'Promotion Immobilière';
            default: return '';
        }
    }

    function renderTable() {
        clientTableBody.innerHTML = '';
        clients.forEach(client => {
            const tr = document.createElement('tr');
            tr.innerHTML = `
                <td>${client.name}</td>
                <td>${client.email}</td>
                <td>${projectLabel(client.project)}</td>
                <td>${client.message}</td>
                <td>
                    <button class="action-btn edit-btn" data-id="${client.id}" title="Éditer"><i class="fa fa-edit"></i></button>
                    <button class="action-btn delete-btn" data-id="${client.id}" title="Supprimer"><i class="fa fa-trash"></i></button>
                    <a href="mailto:${client.email}" class="action-btn contact-btn" title="Contacter"><i class="fa fa-envelope"></i></a>
                </td>
            `;
            clientTableBody.appendChild(tr);
        });
        attachRowEvents();
    }

    function attachRowEvents() {
        document.querySelectorAll('.edit-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                openModal('edit', clients.find(c => c.id == id));
            });
        });
        document.querySelectorAll('.delete-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                const id = btn.getAttribute('data-id');
                if (confirm('Supprimer ce client ?')) {
                    clients = clients.filter(c => c.id != id);
                    saveClients();
                    renderTable();
                }
            });
        });
    }

    function openModal(mode, client) {
        modal.classList.add('active');
        if (mode === 'edit' && client) {
            modalTitle.textContent = 'Modifier un client';
            document.getElementById('clientId').value = client.id;
            document.getElementById('clientName').value = client.name;
            document.getElementById('clientEmail').value = client.email;
            document.getElementById('clientProject').value = client.project;
            document.getElementById('clientMessage').value = client.message;
        } else {
            modalTitle.textContent = 'Ajouter un client';
            clientForm.reset();
            document.getElementById('clientId').value = '';
        }
    }

    function closeModal() {
        modal.classList.remove('active');
    }

    addBtn.addEventListener('click', () => openModal('add'));
    cancelBtn.addEventListener('click', closeModal);

    clientForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const idField = document.getElementById('clientId').value;
        const clientData = {
            id: idField || Date.now(),
            name: document.getElementById('clientName').value.trim(),
            email: document.getElementById('clientEmail').value.trim(),
            project: document.getElementById('clientProject').value,
            message: document.getElementById('clientMessage').value.trim(),
        };
        if (idField) {
            clients = clients.map(c => c.id == idField ? clientData : c);
        } else {
            clients.push(clientData);
        }
        saveClients();
        renderTable();
        closeModal();
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });

    loadClients();
});