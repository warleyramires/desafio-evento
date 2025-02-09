import Logo from "../../assets/image/logo.svg"
import "./Home.css"

const Home = () =>{

    return(
        <div className="page-home">
          <main className="width-page">
            <header className="header">
                <img src={Logo} alt="Logo TokenWeb" className="image-logo" />
            </header>
            </main>  
        </div>
    )
}

export default Home;