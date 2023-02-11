import { FC } from 'react';
import AvatarComponent, { AvatarGroup, IAvatarProps } from './avatar';

interface AvatarInterface extends FC<IAvatarProps> {
  Group: typeof AvatarGroup;
}
// @ts-ignore
const Avatar = AvatarComponent as AvatarInterface;
Avatar.Group = AvatarGroup;

export default Avatar;
