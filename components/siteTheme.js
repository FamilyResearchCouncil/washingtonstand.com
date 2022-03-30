export default function siteTheme() {
    return {
        colors: {
            primaryBlue: '#003366',
            altDarkBlue: '#0c1527',
            altLightBlue: '#6c97c6',
            primaryGold: '#ddbb2b',
            isWhite: '#ffffff',
            transparentBlack: 'rgba(0,0,0,.7)',
            mobileTransparentblack: 'rgba(0,0,0,.85)',
        },
        widths: {
            xlargeMaxWidth: '1100px',
            largeMaxWidth: '800px',
            mediumMaxWidth: '600px',
            contentList: '800px',
            mobileMenu: '576px',
            readingWidth: '80ch'
        },
        padding: {
            sectionPadding: '4rem 2rem'
        },
        breakPoints: {
            small: '480px',
            medium: '768px',
            large: '992px',
            xLarge: '1200px'
        },
        directories: {
            news: 'news'
        }
    }
}