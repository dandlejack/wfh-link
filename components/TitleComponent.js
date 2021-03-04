const TitleHeader = (props) => {

    return <Head>
        <title>เข้าสู่ระบบ</title>
        <meta name="keywords" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
        <meta name="description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
        <meta property="og:url" content="https://หาคนโพส.com/"></meta>
        <meta property="og:title" content="หาคนโพส หาคนโพส.com โพสงาน"></meta>
        <meta property="og:description" content="หาคนโพส หาคนโพส.com โพสงาน "></meta>
        <meta property="og:site_name" content="หาคนโพส.com"></meta>
    </Head>
}
export const getServerSideProps = async ({ params }) => {
    const pid = params.post_id;
    return {
        props: { pid }
    }
}
export default TitleHeader