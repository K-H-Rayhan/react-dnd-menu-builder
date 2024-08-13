import React, { forwardRef, HTMLAttributes } from "react";
import classNames from "classnames";
import { Collapse } from "./Collapse";
import { TreeItem as TreeItemType, TreeItems } from "../../types";
import { UniqueIdentifier } from "@dnd-kit/core";

export interface Props extends Omit<HTMLAttributes<HTMLLIElement>, "id"> {
  childCount?: number;
  clone?: boolean;
  collapsed?: boolean;
  depth: number;
  disableInteraction?: boolean;
  disableSelection?: boolean;
  ghost?: boolean;
  handleProps?: any;
  indicator?: boolean;
  indentationWidth: number;
  value: string;
  onCollapse?(): void;
  onRemove?(): void;
  wrapperRef?(node: HTMLLIElement): void;
  childs?: TreeItems;
  show?: string;
  updateitem?: (
    id: UniqueIdentifier,
    data: Omit<TreeItemType, "children">
  ) => void;
  otherfields?: any;
}

export const TreeItem = forwardRef<HTMLDivElement, Props>(
  (
    {
      childCount,
      clone,
      depth,
      disableSelection,
      disableInteraction,
      ghost,
      handleProps,
      indentationWidth,
      indicator,
      collapsed,
      onCollapse,
      onRemove,
      style,
      value,
      updateitem,
      wrapperRef,
      ...props
    },
    ref
  ) => {
    const [open, setOpen] = React.useState(false);
    const [newData, setNewData] = React.useState<
      Omit<TreeItemType, "children">
    >({
      id: value,
      href: props?.otherfields?.href,
      name: props?.otherfields?.name,
    });

    return (
      <li
        className={classNames({
          Wrapper: true,
          clone: clone,
          ghost: ghost,
          indicator: indicator,
          disableSelection: disableSelection,
          disableInteraction: disableInteraction,
        })}
        ref={wrapperRef}
        style={
          {
            ...(!clone
              ? {
                  paddingLeft: `${indentationWidth * depth}px`,
                }
              : {}),
          } as React.CSSProperties
        }
        {...props}
      >
        <div
          {...handleProps}
          className="TreeItem"
          ref={ref}
          style={{
            ...style,
            height:
              ghost && indicator && childCount
                ? `${childCount * 42 + (childCount - 1) * 9}px`
                : "42px",
          }}
        >
          <span className={"Text"}>
            {props?.otherfields?.name}{" "}
            <span
              style={{
                fontSize: "13px",
                fontWeight: "400",
                fontStyle: "italic",
                color: "#50575e",
                marginLeft: "4px",
              }}
            >
              {depth > 0 ? "sub item" : ""}
            </span>
          </span>
          {!clone && onRemove && (
            <Collapse open={open} handleOpen={() => setOpen(!open)} />
          )}
          {clone && childCount && childCount > 1 ? (
            <div className={"Count"}>
              {props.childs &&
                props.childs.map((child: any) => {
                  return (
                    <RecursiveItem child={child} key={child.id} nDepth={1} />
                  );
                })}
            </div>
          ) : null}
        </div>
        {!(props.show === "true") && open && (
          <div
            style={{
              width: "412px",
              border: "1px solid #c3c4c7",
              marginTop: "-1px",
            }}
          >
            <div
              style={{
                padding: "10px",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <label
                style={{
                  marginTop: "5px",
                  marginBottom: "5px",
                  fontSize: "13px",
                  color: "#646970",
                }}
                htmlFor="label"
              >
                Navigation Label
              </label>
              <input
                value={newData.name}
                onChange={(e) => {
                  setNewData({ ...newData, name: e.target.value });
                }}
                type="text"
                id="label"
                style={{
                  border: "1px solid #dcdcde",
                  height: "30px",
                  borderRadius: "4px",
                  padding: "0 10px",
                }}
              />
              <label
                style={{
                  marginTop: "10px",
                  marginBottom: "5px",
                  fontSize: "13px",
                  color: "#646970",
                }}
                htmlFor="href"
              >
                Navigation Url
              </label>
              <input
                value={newData.href}
                onChange={(e) => {
                  setNewData({ ...newData, href: e.target.value });
                }}
                type="text"
                id="href"
                style={{
                  border: "1px solid #dcdcde",
                  height: "30px",
                  borderRadius: "4px",
                  padding: "0 10px",
                }}
              />
              <div
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: "10px",
                  gap: "12px",
                }}
              >
                <button
                  style={{
                    all: "unset",
                    height: "32px",
                    backgroundColor: "#2271b1",
                    color: "white",
                    padding: "0 12px",
                    fontSize: "13px",
                    borderRadius: "4px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    updateitem && updateitem(value, newData);
                    setOpen(false);
                  }}
                >
                  Save Menu
                </button>
                <button
                  style={{
                    all: "unset",
                    fontSize: "13px",
                    color: "#b32d2e",
                    textDecoration: "underline",
                    cursor: "pointer",
                    marginRight: "5px",
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setOpen(false);
                    onRemove && onRemove();
                  }}
                >
                  Delete Menu
                </button>
              </div>
            </div>
          </div>
        )}
      </li>
    );
  }
);

const RecursiveItem = (props: {
  child: TreeItemType;
  nDepth: number;
  key: string;
}) => {
  const newDepth = props.nDepth + 1;
  return (
    <>
      <div
        style={{
          width: "414px",
          height: "42px",
          border: "1px solid #dcdcde",
          marginTop: "9px",
          marginLeft: `${props.nDepth * 50}px`,
          backgroundColor: "#f6f7f7",
          borderRadius: "4px",
          display: "flex",
          alignItems: "center",
          paddingLeft: "0.5rem",
          fontWeight: "600",
          fontSize: "13px",
        }}
      >
        {props.child.name}{" "}
        <span
          style={{
            fontSize: "13px",
            fontWeight: "400",
            fontStyle: "italic",
            color: "#50575e",
            marginLeft: "4px",
          }}
        >
          sub item
        </span>
      </div>
      {props.child.children.map((child: any) => {
        return <RecursiveItem key={child.id} child={child} nDepth={newDepth} />;
      })}
    </>
  );
};
