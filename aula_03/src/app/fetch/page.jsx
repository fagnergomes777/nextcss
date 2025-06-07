export default async function ExemploPage(){
    const res = await fetch ('https://jsonplaceholder.typicode.com/users');
    const users = await res.json();
    
    return (
        <main>
            <h1>Lista de Usuários</h1>
            <ul>
                {users.map(user => (
                    <li key={user.id}>
                        {user.name} - {user.email}
                    </li>
                ))}
            </ul>
        </main>
    );
}