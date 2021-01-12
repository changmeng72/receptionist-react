import Avatar from 'avatar-initials';
import { IonImg } from '@ionic/react';

export default function AvatarWithInitials({ src, name, num = 0 }) {
     
    if (src) {
        return <IonImg src={src} />
        
    } else {
        name = name.trim().toUpperCase();        
        const names = (name || 'A').split(' ');
        let initials = ''

        if (names.length > 0) {
            initials = initials + names[0].charAt(0);
        }
        if (num > 0) {
            for (let i = 1; i < names.length; i++) {
                if (names[i].length > 0) {
                    initials = initials + names[i].charAt(0);
                    break;
                }
            }
        }
       /* const initial_png = Avatar.initialAvatar({
            initials: initials,
            initial_fg: '#888888',
            initial_bg: '#f4f6f7',
            initial_size: '0',
            initial_weight: 100,
            initial_font_family: "'Lato','Lato-Regular','Helvetica Neue'",

        });*/
        const initial_png = Avatar.initialAvatar({
       // Allow Gravatars or not.
  size: 200,                // Size in pixels, fallback for hidden images and Gravatar
  
  // Initial Avatars Specific
  initials: initials,          // Initials to be used.
  initial_fg: '#888888', // Text Color
  initial_bg: '#f4f6f7', // Background Color
  initial_size: 50,       // Text Size in pixels
  initial_weight: 100,   // Font weight (numeric value for light, bold, etc.)
  initial_font_family: "'Lato', 'Lato-Regular', 'Helvetica Neue'",

  
});
       
        return <IonImg src={initial_png} />
      

    }
    
}