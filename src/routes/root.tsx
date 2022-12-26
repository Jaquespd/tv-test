import { Outlet, Link, useLoaderData } from "react-router-dom";
import {
  useFocusable,
  FocusContext,
  FocusDetails,
  FocusableComponentLayout,
  KeyPressDetails,
} from "@noriginmedia/norigin-spatial-navigation";
// import "../App.css";
import styled, { createGlobalStyle } from "styled-components";
import shuffle from "lodash/shuffle";
import React, { useEffect, useRef, useCallback } from "react";
import logo from "../logo.svg";

const AppContainer = styled.div`
  background-color: #d9d9d9;
  width: 1920px;
  height: 1080px;
  display: flex;
  flex-direction: row;
`;

interface MenuItemBoxProps {
  focused: boolean;
}

const MenuLogoBox = styled.img<{}>`
  height: 151px;
  margin-bottom: 100px;
`;

const MenuItemBox = styled.button<MenuItemBoxProps>`
  width: 600px;
  height: 75px;
  background-color: #4e4e4e;
  border-color: #000000;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 1)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 37px;
  font-size: 30px;
  text-align: center;
  color: white;
`;

const MenuItemInput = styled.input<MenuItemBoxProps>`
  width: 600px;
  height: 75px;
  background-color: #edebeb;
  border-color: #000000;
  border-style: solid;
  border-width: ${({ focused }) => (focused ? "6px" : 1)};
  box-sizing: border-box;
  border-radius: 7px;
  margin-bottom: 37px;
  font-size: 30px;
`;

function MenuItem() {
  const { ref, focused } = useFocusable();

  return (
    <MenuItemBox ref={ref} focused={focused}>
      CONNECT
    </MenuItemBox>
  );
}

interface InputProps {
  title: string;
  color: string;
  onEnterPress: (props: object, details: KeyPressDetails) => void;
  onFocus: (
    layout: FocusableComponentLayout,
    props: object,
    details: FocusDetails
  ) => void;
}

function MenuInput({ title, color, onEnterPress, onFocus }: InputProps) {
  const { ref, focused } = useFocusable({
    onEnterPress,
    onFocus,
    extraProps: {
      title,
      color,
    },
  });

  return <MenuItemInput placeholder={title} ref={ref} focused={focused} />;
}

interface MenuWrapperProps {
  hasFocusedChild?: boolean;
}

const MenuWrapper = styled.div<MenuWrapperProps>`
  flex: 1;
  max-width: 1920px;
  max-height: 1080px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: "#362C56";
  /* background-color: ${({ hasFocusedChild }) =>
    hasFocusedChild ? "#4e4181" : "#362C56"}; */
  padding-top: 37px;
`;

interface MenuProps {
  focusKey: string;
}

const ContentTitle = styled.div`
  color: 000000;
  font-size: 30px;
  font-weight: 600;
  font-family: "Segoe UI";
  text-align: left;
  /* margin-top: 52px; */
  margin-bottom: 20px;
`;

const ContentSubtitle = styled.div`
  color: 000000;
  max-width: 600px;
  font-size: 22px;
  font-weight: 600;
  font-family: "Segoe UI";
  text-align: left;
  /* margin-top: 52px; */
  margin-bottom: 20px;
`;

const Divider = styled.div`
  margin-bottom: 20px;
  height: 30px;
  border-bottom: 1px solid #4e4e4e;
`;

const ContentWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  display: flex;
  flex-direction: column;
`;

function Menu({ focusKey: focusKeyParam }: MenuProps) {
  const { ref, focusSelf, hasFocusedChild, focusKey } = useFocusable({
    focusable: true,
    saveLastFocusedChild: false,
    trackChildren: true,
    autoRestoreFocus: true,
    isFocusBoundary: false,
    focusKey: focusKeyParam,
    preferredChildFocusKey: undefined,
    onEnterPress: () => {},
    onEnterRelease: () => {},
    onArrowPress: () => true,
    onFocus: () => {},
    onBlur: () => {},
    extraProps: { foo: "bar" },
  });

  useEffect(() => {
    focusSelf();
  }, [focusSelf]);

  const scrollingRef: any = useRef(null);

  const onAssetPress = useCallback(() => {
    console.log("PRESS");
  }, []);

  const onAssetFocus = useCallback(
    ({ x }: { x: number }) => {
      scrollingRef?.current?.scrollTo({
        left: x,
        behavior: "smooth",
      });
    },
    [scrollingRef]
  );

  return (
    <FocusContext.Provider value={focusKey}>
      <MenuWrapper ref={ref}>
        {/* <MenuWrapper ref={ref} hasFocusedChild={hasFocusedChild}> */}
        <ContentWrapper>
          <MenuLogoBox src={logo} />
          <ContentTitle>Login with client code</ContentTitle>
          <MenuInput
            key={1}
            title={"Client code"}
            color={"color"}
            onEnterPress={onAssetPress}
            onFocus={onAssetFocus}
          />
          <MenuInput
            key={2}
            title={"Device code"}
            color={"color"}
            onEnterPress={onAssetPress}
            onFocus={onAssetFocus}
          />
          <MenuItem />
          <Divider />
          <ContentSubtitle>
            If you don't have an account, go to the site and create a new
            service account.
          </ContentSubtitle>
        </ContentWrapper>
      </MenuWrapper>
    </FocusContext.Provider>
  );
}

export default function Root() {
  return (
    <AppContainer>
      <Menu focusKey="MENU" />
    </AppContainer>
  );
}
