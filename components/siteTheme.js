export default function siteTheme() {
    return {
        colors: {
            primaryBlue: '#4239F7',
            primaryYellow: '#EAA53E',
            primaryGrey: '#E5E5E4',
            alternateGrey: '#727272',
            isWhite: '#ffffff',
            isBlack: '#000000',
            transparentBlack: 'rgba(0,0,0,.7)',
            mobileTransparentBlack: 'rgba(0,0,0,.85)'
        },
        widths: {
            xlargeMaxWidth: '1400px',
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
        }
    }
}

