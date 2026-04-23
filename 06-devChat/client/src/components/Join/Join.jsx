import stlyle from "./Join.module.css"

import {Input, Button} from "@mui/material"

const Join = () => {
    return (
        <div>
            <h2>Bem-vindo ao devChat</h2>
            <Input inputRef={usernameRef} placeholder="Nome de usuário" />
            <Button sx={{mt:2, mb:2}} variant="contained" onClick={() => handleSubmit()}> Entrar

            </Button>
        </div>
    )
}

export default Join