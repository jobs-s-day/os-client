
import React from 'react';
import styles from './window.module.scss';
import { MenuRegister } from 'bases/menu/Register';
import Draggable, { DraggableCore } from 'react-draggable';
import menuStore, { KeyType, PositionType } from '../../../stores/menu';
import { Window as BaseWindow, TitleBar, Text, SegmentedControl, SegmentedControlItem } from 'react-desktop/macOs';
import { ContextMenu, MenuItem, ContextMenuTrigger } from "react-contextmenu";

export interface IWindowProps {
  title: string
  children: React.ReactElement
}

export const Window: React.FC<IWindowProps> = (props) => {
  return (
    <Draggable
      handle=".handle"
      defaultPosition={{
        x: 300,
        y: 200
      }}
    >
      <BaseWindow
        chrome
        width={700}
        height={400}
        padding={0}
      >
        <TitleBar title={props.title} className="handle" controls />
        <div className={styles.content}>{props.children}</div>
      </BaseWindow>
    </Draggable>
  );
}