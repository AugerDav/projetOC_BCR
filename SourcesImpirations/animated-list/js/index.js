(function() {
  // no jQuery, just for "fun". It was no fun at all.
  var addListItem, animationEndEvent, i, input, item, itemClickHandler, len, prefix, ref, removeListItem;

  prefix = (function() {
    var dom, pre, styles;
    styles = window.getComputedStyle(document.documentElement, "");
    pre = (Array.prototype.slice.call(styles).join("").match(/-(moz|webkit|ms)-/) || (styles.OLink === "" && ["", "o"]))[1];
    dom = "WebKit|Moz|MS|O".match(new RegExp("(" + pre + ")", "i"))[1];
    return {
      dom: dom,
      lowercase: pre,
      css: "-" + pre + "-",
      js: pre[0].toUpperCase() + pre.substr(1)
    };
  })();

  animationEndEvent = prefix.lowercase + "AnimationEnd";

  if (prefix.lowercase === "moz") {
    animationEndEvent = "animationend";
  }

  console.log(animationEndEvent);

  window.insertAnimation = function(text, list) {
    var closeIcon, firstItem, i, item, items, len, newItem, ref;
    items = list.querySelectorAll(".list__item");
    ref = list.querySelectorAll(".list__item");
    for (i = 0, len = ref.length; i < len; i++) {
      item = ref[i];
      item.classList.add("list__item--inserting");
      item.addEventListener(animationEndEvent, function(event) {
        return event.target.classList.remove("list__item--inserting");
      });
    }
    newItem = document.createElement("li");
    newItem.classList.add("list__item");
    newItem.classList.add("list__item--inserting-new");
    newItem.innerHTML = text;
    closeIcon = document.createElement("i");
    closeIcon.classList.add("icon-close");
    newItem.appendChild(closeIcon);
    closeIcon.addEventListener("click", itemClickHandler);
    firstItem = items[0];
    list.insertBefore(newItem, firstItem);
    return newItem.addEventListener(animationEndEvent, function(event) {
      return event.target.classList.remove("list__item--inserting-new");
    });
  };

  window.removeAnimation = function(index, list) {
    var handler, i, item, items, len, postCount, postItem, postItems;
    items = list.querySelectorAll(".list__item");
    item = items.item(index);
    item.classList.add("list__item--inserting-removed");
    postItems = document.querySelectorAll(`.list__item:nth-child(1n+${index + 2})`);
    postCount = 0;
    handler = function(event) {
      var i, len, removeItem, results;
      event.target.removeEventListener(animationEndEvent, arguments.callee);
      postCount++;
      if (postCount === postItems.length || postCount > 5) {
        list.removeChild(item);
        results = [];
        for (i = 0, len = postItems.length; i < len; i++) {
          removeItem = postItems[i];
          results.push(removeItem.classList.remove("list__item--removing-sibling"));
        }
        return results;
      }
    };
    for (i = 0, len = postItems.length; i < len; i++) {
      postItem = postItems[i];
      postItem.classList.add("list__item--removing-sibling");
      postItem.addEventListener(animationEndEvent, handler);
    }
    if (postItems.length === 0) {
      return item.addEventListener(animationEndEvent, function() {
        return list.removeChild(item);
      });
    }
  };

  addListItem = function() {
    var input, list, todoText;
    input = document.querySelectorAll(".list-input").item(0);
    list = document.querySelectorAll(".list").item(0);
    todoText = input.value;
    input.value = "";
    if (todoText !== "") {
      return insertAnimation(todoText, list);
    }
  };

  removeListItem = function(index) {
    var list;
    list = document.querySelectorAll(".list").item(0);
    return removeAnimation(index, list);
  };

  input = document.querySelectorAll(".list-input")[0];

  input.addEventListener("keyup", function(event) {
    if (event.keyCode === 13) {
      return addListItem();
    }
  });

  itemClickHandler = function(event) {
    var index, itemsArray, itemsNodeList, listItem;
    listItem = event.target.parentNode;
    event.target.removeEventListener("click", arguments.callee);
    itemsNodeList = document.querySelectorAll(".list .list__item");
    itemsArray = Array.prototype.slice.call(itemsNodeList);
    index = itemsArray.indexOf(listItem);
    return removeListItem(index);
  };

  ref = document.querySelectorAll(".list .list__item .icon-close");
  for (i = 0, len = ref.length; i < len; i++) {
    item = ref[i];
    item.addEventListener("click", itemClickHandler);
  }

  input.style.marginBottom = String(input.offsetHeight) + "px";

  setTimeout(function() {
    return addListItem();
  }, 1000);

}).call(this);

//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiPGFub255bW91cz4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7RUFBQTtBQUFBLE1BQUEsV0FBQSxFQUFBLGlCQUFBLEVBQUEsQ0FBQSxFQUFBLEtBQUEsRUFBQSxJQUFBLEVBQUEsZ0JBQUEsRUFBQSxHQUFBLEVBQUEsTUFBQSxFQUFBLEdBQUEsRUFBQTs7RUFFQSxNQUFBLEdBQVMsQ0FBQyxRQUFBLENBQUEsQ0FBQTtBQUNSLFFBQUEsR0FBQSxFQUFBLEdBQUEsRUFBQTtJQUFBLE1BQUEsR0FBUyxNQUFNLENBQUMsZ0JBQVAsQ0FBd0IsUUFBUSxDQUFDLGVBQWpDLEVBQWtELEVBQWxEO0lBQ1QsR0FBQSxHQUFNLENBQUMsS0FBSyxDQUFBLFNBQUUsQ0FBQSxLQUFLLENBQUMsSUFBYixDQUFrQixNQUFsQixDQUF5QixDQUFDLElBQTFCLENBQStCLEVBQS9CLENBQWtDLENBQUMsS0FBbkMsQ0FBeUMsbUJBQXpDLENBQUEsSUFBaUUsQ0FBQyxNQUFNLENBQUMsS0FBUCxLQUFnQixFQUFoQixJQUF1QixDQUM5RixFQUQ4RixFQUU5RixHQUY4RixDQUF4QixDQUFsRSxDQUdGLENBQUEsQ0FBQTtJQUNKLEdBQUEsR0FBTyxpQkFBa0IsQ0FBQyxLQUFwQixDQUEwQixJQUFJLE1BQUosQ0FBVyxHQUFBLEdBQU0sR0FBTixHQUFZLEdBQXZCLEVBQTRCLEdBQTVCLENBQTFCLENBQTRELENBQUEsQ0FBQTtXQUNsRTtNQUFBLEdBQUEsRUFBSyxHQUFMO01BQ0EsU0FBQSxFQUFXLEdBRFg7TUFFQSxHQUFBLEVBQUssR0FBQSxHQUFNLEdBQU4sR0FBWSxHQUZqQjtNQUdBLEVBQUEsRUFBSSxHQUFJLENBQUEsQ0FBQSxDQUFFLENBQUMsV0FBUCxDQUFBLENBQUEsR0FBdUIsR0FBRyxDQUFDLE1BQUosQ0FBVyxDQUFYO0lBSDNCO0VBUFEsQ0FBRCxDQUFBLENBQUE7O0VBYVQsaUJBQUEsR0FBb0IsTUFBTSxDQUFDLFNB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QUFBLEtBQUEsRUFBQSxVQUFBLEVBQUEsYUFBQSxFQUFBO0lBQUEsUUFBQSxHQUFXLEtBQUssQ0FBQyxNQUFNLENBQUM7SUFDeEIsS0FBSyxDQUFDLE1BQU0sQ0FBQyxtQkFBYixDQUFpQyxPQUFqQyxFQUEwQyxTQUFTLENBQUMsTUFBcEQ7SUFDQSxhQUFBLEdBQWdCLFFBQVEsQ0FBQyxnQkFBVCxDQUEwQixtQkFBMUI7SUFDaEIsVUFBQSxHQUFhLEtBQUssQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLElBQXRCLENBQTJCLGFBQTNCO0lBQ2IsS0FBQSxHQUFRLFVBQVUsQ0FBQyxPQUFYLENBQW1CLFFBQW5CO1dBQ1IsY0FBQSxDQUFlLEtBQWY7RUFOaUI7O0FBUW5CO0VBQUEsS0FBQSxxQ0FBQTs7SUFDRSxJQUFJLENBQUMsZ0JBQUwsQ0FBc0IsT0FBdEIsRUFBK0IsZ0JBQS9CO0VBREY7O0VBR0EsS0FBSyxDQUFDLEtBQUssQ0FBQyxZQUFaLEdBQTJCLE1BQUEsQ0FBTyxLQUFLLENBQUMsWUFBYixDQUFBLEdBQTJCOztFQUV0RCxVQUFBLENBQVcsUUFBQSxDQUFBLENBQUE7V0FDVCxXQUFBLENBQUE7RUFEUyxDQUFYLEVBRUUsSUFGRjtBQXBHQSIsInNvdXJjZXNDb250ZW50IjpbIiMgbm8galF1ZXJ5LCBqdXN0IGZvciBcImZ1blwiLiBJdCB3YXMgbm8gZnVuIGF0IGFsbC5cblxucHJlZml4ID0gKC0+XG4gIHN0eWxlcyA9IHdpbmRvdy5nZXRDb21wdXRlZFN0eWxlKGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCwgXCJcIilcbiAgcHJlID0gKEFycmF5OjpzbGljZS5jYWxsKHN0eWxlcykuam9pbihcIlwiKS5tYXRjaCgvLShtb3p8d2Via2l0fG1zKS0vKSBvciAoc3R5bGVzLk9MaW5rIGlzIFwiXCIgYW5kIFtcbiAgICBcIlwiXG4gICAgXCJvXCJcbiAgXSkpWzFdXG4gIGRvbSA9IChcIldlYktpdHxNb3p8TVN8T1wiKS5tYXRjaChuZXcgUmVnRXhwKFwiKFwiICsgcHJlICsgXCIpXCIsIFwiaVwiKSlbMV1cbiAgZG9tOiBkb21cbiAgbG93ZXJjYXNlOiBwcmVcbiAgY3NzOiBcIi1cIiArIHByZSArIFwiLVwiXG4gIGpzOiBwcmVbMF0udG9VcHBlckNhc2UoKSArIHByZS5zdWJzdHIoMSlcbikoKVxuXG5hbmltYXRpb25FbmRFdmVudCA9IHByZWZpeC5sb3dlcmNhc2UrXCJBbmltYXRpb25FbmRcIlxuYW5pbWF0aW9uRW5kRXZlbnQgPSBcImFuaW1hdGlvbmVuZFwiIGlmIHByZWZpeC5sb3dlcmNhc2UgaXMgXCJtb3pcIlxuY29uc29sZS5sb2cgYW5pbWF0aW9uRW5kRXZlbnRcblxud2luZG93Lmluc2VydEFuaW1hdGlvbiA9ICh0ZXh0LCBsaXN0KS0+XG4gIGl0ZW1zID0gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3RfX2l0ZW1cIilcbiBcbiAgZm9yIGl0ZW0gaW4gbGlzdC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3RfX2l0ZW1cIilcbiAgICBpdGVtLmNsYXNzTGlzdC5hZGQoXCJsaXN0X19pdGVtLS1pbnNlcnRpbmdcIilcbiAgICBpdGVtLmFkZEV2ZW50TGlzdGVuZXIgYW5pbWF0aW9uRW5kRXZlbnQsIChldmVudCktPlxuICAgICAgZXZlbnQudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJsaXN0X19pdGVtLS1pbnNlcnRpbmdcIilcbiAgXG4gIFxuICBuZXdJdGVtID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImxpXCIpXG4gIG5ld0l0ZW0uY2xhc3NMaXN0LmFkZCBcImxpc3RfX2l0ZW1cIiBcbiAgbmV3SXRlbS5jbGFzc0xpc3QuYWRkIFwibGlzdF9faXRlbS0taW5zZXJ0aW5nLW5ld1wiXG4gIG5ld0l0ZW0uaW5uZXJIVE1MID0gdGV4dFxuICBjbG9zZUljb24gPSBkb2N1bWVudC5jcmVhdGVFbGVtZW50KFwiaVwiKVxuICBjbG9zZUljb24uY2xhc3NMaXN0LmFkZCBcImljb24tY2xvc2VcIlxuICBuZXdJdGVtLmFwcGVuZENoaWxkIGNsb3NlSWNvblxuICBjbG9zZUljb24uYWRkRXZlbnRMaXN0ZW5lciBcImNsaWNrXCIsIGl0ZW1DbGlja0hhbmRsZXIgIFxuXG4gIGZpcnN0SXRlbSA9IGl0ZW1zWzBdXG4gIGxpc3QuaW5zZXJ0QmVmb3JlKG5ld0l0ZW0sIGZpcnN0SXRlbSlcbiAgbmV3SXRlbS5hZGRFdmVudExpc3RlbmVyIGFuaW1hdGlvbkVuZEV2ZW50LCAoZXZlbnQpLT5cbiAgICAgIGV2ZW50LnRhcmdldC5jbGFzc0xpc3QucmVtb3ZlKFwibGlzdF9faXRlbS0taW5zZXJ0aW5nLW5ld1wiKVxuICAgIFxud2luZG93LnJlbW92ZUFuaW1hdGlvbiA9IChpbmRleCwgbGlzdCktPlxuICBpdGVtcyA9IGxpc3QucXVlcnlTZWxlY3RvckFsbChcIi5saXN0X19pdGVtXCIpXG4gIGl0ZW0gPSBpdGVtcy5pdGVtKGluZGV4KSAgXG4gIGl0ZW0uY2xhc3NMaXN0LmFkZChcImxpc3RfX2l0ZW0tLWluc2VydGluZy1yZW1vdmVkXCIpXG4gIHBvc3RJdGVtcyA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdF9faXRlbTpudGgtY2hpbGQoMW4rI3soaW5kZXgrMil9KVwiKVxuXG4gIHBvc3RDb3VudCA9IDBcbiAgaGFuZGxlciA9IChldmVudCktPlxuICAgIGV2ZW50LnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyIGFuaW1hdGlvbkVuZEV2ZW50LCBhcmd1bWVudHMuY2FsbGVlXG4gICAgcG9zdENvdW50KytcbiAgICBpZiBwb3N0Q291bnQgaXMgcG9zdEl0ZW1zLmxlbmd0aCBvciBwb3N0Q291bnQgPiA1XG4gICAgICBsaXN0LnJlbW92ZUNoaWxkKGl0ZW0pXG4gICAgICBmb3IgcmVtb3ZlSXRlbSBpbiBwb3N0SXRlbXNcbiAgICAgICAgcmVtb3ZlSXRlbS5jbGFzc0xpc3QucmVtb3ZlKFwibGlzdF9faXRlbS0tcmVtb3Zpbmctc2libGluZ1wiKVxuICAgICAgICBcbiAgICAgICAgXG4gIFxuICBmb3IgcG9zdEl0ZW0gaW4gcG9zdEl0ZW1zXG4gICAgcG9zdEl0ZW0uY2xhc3NMaXN0LmFkZChcImxpc3RfX2l0ZW0tLXJlbW92aW5nLXNpYmxpbmdcIilcbiAgICBwb3N0SXRlbS5hZGRFdmVudExpc3RlbmVyIGFuaW1hdGlvbkVuZEV2ZW50LCBoYW5kbGVyXG4gICAgXG4gIGlmIHBvc3RJdGVtcy5sZW5ndGggaXMgMFxuICAgIGl0ZW0uYWRkRXZlbnRMaXN0ZW5lciBhbmltYXRpb25FbmRFdmVudCwgLT4gbGlzdC5yZW1vdmVDaGlsZChpdGVtKVxuICAgIFxuICAgICAgXG5hZGRMaXN0SXRlbSA9IC0+XG4gIGlucHV0ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbChcIi5saXN0LWlucHV0XCIpLml0ZW0oMClcbiAgbGlzdCA9IGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoXCIubGlzdFwiKS5pdGVtKDApXG4gIFxuICB0b2RvVGV4dCA9IGlucHV0LnZhbHVlXG4gIGlucHV0LnZhbHVlID0gXCJcIlxuICBpZiB0b2RvVGV4dCBpc250IFwiXCJcbiAgICBpbnNlcnRBbmltYXRpb24odG9kb1RleHQsIGxpc3QpXG5cbiAgICBcbnJlbW92ZUxpc3RJdGVtID0gKGluZGV4KS0+XG4gIGxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3RcIikuaXRlbSgwKVxuICByZW1vdmVBbmltYXRpb24oaW5kZXgsIGxpc3QpXG4gIFxuaW5wdXQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3QtaW5wdXRcIilbMF1cblxuaW5wdXQuYWRkRXZlbnRMaXN0ZW5lciBcImtleXVwXCIsIChldmVudCktPlxuICBpZiBldmVudC5rZXlDb2RlIGlzIDEzXG4gICAgYWRkTGlzdEl0ZW0oKVxuXG5pdGVtQ2xpY2tIYW5kbGVyID0gKGV2ZW50KS0+XG4gIGxpc3RJdGVtID0gZXZlbnQudGFyZ2V0LnBhcmVudE5vZGVcbiAgZXZlbnQudGFyZ2V0LnJlbW92ZUV2ZW50TGlzdGVuZXIgXCJjbGlja1wiLCBhcmd1bWVudHMuY2FsbGVlXG4gIGl0ZW1zTm9kZUxpc3QgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3QgLmxpc3RfX2l0ZW1cIilcbiAgaXRlbXNBcnJheSA9IEFycmF5LnByb3RvdHlwZS5zbGljZS5jYWxsKGl0ZW1zTm9kZUxpc3QpXG4gIGluZGV4ID0gaXRlbXNBcnJheS5pbmRleE9mKGxpc3RJdGVtKVxuICByZW1vdmVMaXN0SXRlbShpbmRleClcbiAgXG5mb3IgaXRlbSBpbiBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmxpc3QgLmxpc3RfX2l0ZW0gLmljb24tY2xvc2VcIilcbiAgaXRlbS5hZGRFdmVudExpc3RlbmVyIFwiY2xpY2tcIiwgaXRlbUNsaWNrSGFuZGxlclxuICBcbmlucHV0LnN0eWxlLm1hcmdpbkJvdHRvbSA9IFN0cmluZyhpbnB1dC5vZmZzZXRIZWlnaHQpK1wicHhcIlxuXG5zZXRUaW1lb3V0IC0+XG4gIGFkZExpc3RJdGVtKClcbiwgMTAwMFxuXG5cblxuIl19
//# sourceURL=coffeescript