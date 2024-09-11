import React from 'react'
import { StyledIconSVG } from '@/styles/global'
import { CustomSVGProps } from '@/assets/icons/types'

const TreeAssetSVGIcon: React.FC<CustomSVGProps> = (props) => (
  <StyledIconSVG
    width="22"
    height="22"
    viewBox="0 0 22 22"
    xmlns="http://www.w3.org/2000/svg"
    $variant={props.variant}
    $isActive={props.isActive}
    {...props}
  >
    <path
      d="M11.3019 0.61172C11.2847 0.611877 11.2676 0.612455 11.2505 0.613451C11.178 0.618598 11.1065 0.6331 11.038 0.656565C10.986 0.674479 10.9361 0.697393 10.889 0.724959L2.23391 5.52414C2.11211 5.5917 2.01097 5.68887 1.94066 5.80587C1.87035 5.92287 1.83333 6.05558 1.83334 6.19068C1.83334 6.19587 1.8337 6.20176 1.83388 6.2073C1.8337 6.21336 1.83388 6.21942 1.83388 6.22565V15.8101C1.83386 15.9493 1.87316 16.086 1.94761 16.2054C2.02205 16.3249 2.12885 16.4228 2.25663 16.4886L10.9082 21.2862C10.9245 21.295 10.9407 21.3032 10.9569 21.311V21.3128C10.9813 21.3241 11.0063 21.3341 11.0317 21.3429C11.0317 21.3438 11.0407 21.3455 11.0425 21.3464C11.0678 21.355 11.093 21.3617 11.1192 21.3676C11.1282 21.3684 11.1291 21.3702 11.1336 21.371C11.1588 21.3762 11.185 21.3807 11.2111 21.3837C11.2111 21.3841 11.2201 21.3844 11.2237 21.3845C11.2508 21.3871 11.2787 21.3889 11.3057 21.3889C11.3328 21.3889 11.3607 21.3871 11.3878 21.3845C11.3878 21.3841 11.3968 21.3838 11.4004 21.3837C11.4265 21.381 11.4524 21.3768 11.4779 21.371C11.4869 21.3702 11.4878 21.3693 11.4923 21.3676C11.5182 21.3617 11.5438 21.3546 11.5689 21.3464C11.5689 21.3455 11.578 21.3438 11.5798 21.3429C11.6052 21.3341 11.6302 21.3241 11.6546 21.3128V21.3111C11.671 21.3033 11.6873 21.295 11.7033 21.2863L20.3551 16.4886C20.4829 16.4229 20.5897 16.325 20.6641 16.2055C20.7385 16.086 20.7778 15.9494 20.7778 15.8102V6.21985C20.7778 6.21206 20.7772 6.20496 20.7771 6.19752H20.7773V6.19059C20.7773 6.0794 20.7521 5.96954 20.7036 5.86859C20.6551 5.76763 20.5844 5.67797 20.4964 5.60578C20.4874 5.59885 20.4793 5.59175 20.4702 5.58492C20.4702 5.58318 20.4612 5.58059 20.4612 5.57885C20.4305 5.55632 20.3982 5.53592 20.3644 5.51782L11.7142 0.720717C11.5878 0.6478 11.4428 0.609868 11.2954 0.611114L11.3019 0.61172ZM11.3109 2.56164C11.3758 2.56164 11.441 2.57783 11.4993 2.61012L17.3912 5.87745C17.6426 6.01684 17.6426 6.36513 17.3912 6.50451L11.4992 9.77184C11.4419 9.80362 11.3769 9.82034 11.3107 9.82034C11.2445 9.82034 11.1795 9.80362 11.1222 9.77184L5.23034 6.50451C4.97903 6.36521 4.97894 6.01684 5.23034 5.87745L11.1224 2.61012C11.1797 2.57841 11.2447 2.56169 11.3108 2.56164H11.3109ZM4.02773 8.15263C4.09576 8.15169 4.16277 8.1686 4.22152 8.20155L10.1021 11.4625C10.1592 11.4941 10.2067 11.5397 10.2397 11.5946C10.2727 11.6495 10.2901 11.7118 10.2901 11.7752V18.2965C10.2901 18.5746 9.97668 18.7484 9.72583 18.6093L3.84556 15.3484C3.78839 15.3167 3.74092 15.2711 3.70792 15.2162C3.67491 15.1613 3.65754 15.099 3.65754 15.0356V8.51426C3.65754 8.30578 3.83375 8.15584 4.02773 8.15263ZM18.5938 8.15263C18.7876 8.1561 18.964 8.3057 18.964 8.51426V15.0355C18.964 15.1645 18.8919 15.2838 18.7758 15.3484L12.8954 18.6093C12.6448 18.7483 12.3313 18.5746 12.3313 18.2964V11.7752C12.3313 11.6462 12.4034 11.527 12.5194 11.4624L18.3997 8.20146C18.4585 8.1685 18.5256 8.15159 18.5937 8.15255L18.5938 8.15263Z"
      fill="currentColor"
    />
  </StyledIconSVG>
)

export default TreeAssetSVGIcon
