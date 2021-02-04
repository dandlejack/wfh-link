import Register from '../components/register'

export default function RegisterPage () {
    return <Register/>
}

export async function getStaticProps(context) {
    return {
        props:{}
    }
}