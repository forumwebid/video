/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

export const getSubtitleTemplateStyle = (styleObj: any) => {
    let classes = "inline-block text-center uppercase tracking-wide whitespace-pre-wrap break-words ";
    let styles: any = { 
        fontSize: `${styleObj.size}cqh`, 
        lineHeight: '1.3', 
        fontFamily: styleObj.font, 
        color: styleObj.color, 
        '--active-color': styleObj.activeColor, 
        '--base-color': styleObj.color 
    };

    if (styleObj.bgStyle === 'blur') classes += "bg-black/60 backdrop-blur-md rounded-lg px-4 py-2 border border-white/20 ";
    else if (styleObj.bgStyle === 'solid') { 
        classes += "rounded-sm px-4 py-1.5 "; 
        styles.backgroundColor = styleObj.bgColor; 
    }
    else classes += "px-4 py-1 ";

    if (styleObj.bgStyle === 'none' && styleObj.anim !== 'karaoke') styles.textShadow = '0.2cqh 0.2cqh 0 #000, -0.1cqh -0.1cqh 0 #000, 0.1cqh -0.1cqh 0 #000, -0.1cqh 0.1cqh 0 #000, 0.1cqh 0.1cqh 0 #000, 0.3cqh 0.3cqh 0 #000';

    if (styleObj.anim === 'popSpring') styles.animation = 'popSpring 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
    else if (styleObj.anim === 'popIn') styles.animation = 'popIn 0.2s ease-out forwards';
    else if (styleObj.anim === 'fadeIn') {
       styles.animation = 'fadeIn 0.2s ease-in forwards';
    }
    return { classes, styles };
};
