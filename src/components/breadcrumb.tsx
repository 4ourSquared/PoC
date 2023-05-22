function Breadcrumb(){
    return(
        <nav aria-label="breadcrumb">
            <ol className="breadcrumb">
                <li className="breadcrumb-item active" aria-current="page">Home</li>
            </ol>
        </nav>
    )
}

export function Header(){
return(
    <header>
        <h1>Lumos Minima</h1>
        <Breadcrumb />
    </header>
)
}