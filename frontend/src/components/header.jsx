import { createMemo, For, Show } from "solid-js";

/**
 *
 * @param {Object} props
 * @param {string} props.sort
 * @param {string} props.search
 * @param {string} props.filteredTag
 * @param {string[]} props.tagOptions
 * @param {string} props.dueDateStart
 * @param {string} props.dueDateEnd
 * @param {Function} props.onSearchChange
 * @param {Function} props.onTagChange
 * @param {Function} props.onDueDateStartChange
 * @param {Function} props.onDueDateEndChange
 * @param {Function} props.onClearDateRange
 * @param {Function} props.onNewLanBtnClick
 * @param {Function} props.viewMode
 * @param {Function} props.onViewModeChange
 * @param {boolean} props.selectionMode
 * @param {Function} props.onSelectionModeChange
 */
export function Header(props) {
  function formatDateForInput(date) {
    const year = date.getFullYear();
    const month = `${date.getMonth() + 1}`.padStart(2, "0");
    const day = `${date.getDate()}`.padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function handleSetDateRangeToday() {
    const today = formatDateForInput(new Date());
    props.onDueDateStartChange(today);
    props.onDueDateEndChange(today);
  }

  function handleSetDateRangeNext7Days() {
    const today = new Date();
    const end = new Date(today);
    end.setDate(end.getDate() + 7);
    props.onDueDateStartChange(formatDateForInput(today));
    props.onDueDateEndChange(formatDateForInput(end));
  }

  const filterSelect = createMemo(() => {
    if (!props.tagOptions.length) {
      return null;
    }
    return (
      <div class="app-header__control app-header__control--tag-filter">
        <label class="app-header__group-item-label" for="header-tag-filter">Filter tag:</label>
        <select
          id="header-tag-filter"
          onChange={props.onTagChange}
          value={props.filteredTag || "none"}
        >
          <option value="none">None</option>
          <For each={props.tagOptions}>
            {(tag) => <option value={tag}>{tag}</option>}
          </For>
        </select>
      </div>
    );
  });

  return (
    <header class="app-header">
      <div class="app-header__row app-header__row--primary">
        <div class="app-header__group app-header__group--search">
          <div class="app-header__control app-header__control--search">
            <label class="app-header__group-item-label" for="header-search">Search:</label>
            <input
              id="header-search"
              placeholder="Search cards"
              type="text"
              value={props.search}
              onInput={(e) => props.onSearchChange(e.target.value)}
              class="search-input"
            />
            <Show when={props.search?.trim()}>
              <button
                type="button"
                onClick={() => props.onSearchChange("")}
                class="date-range-clear"
                title="Clear search"
              >
                ✕
              </button>
            </Show>
          </div>
        </div>

        <div class="app-header__group app-header__group--actions">
          <button
            type="button"
            onClick={props.onNewLaneBtnClick}
            disabled={props.selectionMode}
          >
            New lane
          </button>
          <button
            type="button"
            onClick={() => props.onSelectionModeChange?.(!props.selectionMode)}
            class={props.selectionMode ? "button--active" : ""}
          >
            {props.selectionMode ? "Exit selection" : "Select cards"}
          </button>
        </div>
      </div>

      <div class="app-header__row app-header__row--secondary">
        <div class="app-header__group app-header__group--sorting">
          <div class="app-header__control app-header__control--sort">
            <label class="app-header__group-item-label" for="header-sort">Sort:</label>
            <select id="header-sort" onChange={props.onSortChange} value={props.sort}>
              <option value="none">Manually</option>
              <option value="name:asc">Name asc</option>
              <option value="name:desc">Name desc</option>
              <option value="tags:asc">Tags asc</option>
              <option value="tags:desc">Tags desc</option>
              <option value="due:asc">Due date asc</option>
              <option value="due:desc">Due date desc</option>
              <option value="lastUpdated:desc">Last updated</option>
              <option value="createdFirst:asc">Created first</option>
            </select>
          </div>
          {filterSelect()}
          <div class="app-header__control app-header__control--view-mode">
            <label class="app-header__group-item-label" for="header-view-mode">View:</label>
            <select id="header-view-mode" onChange={props.onViewModeChange} value={props.viewMode}>
              <option value="extended">Extended</option>
              <option value="regular">Regular</option>
              <option value="compact">Compact</option>
              <option value="tight">Tight</option>
            </select>
          </div>
        </div>

        <div class="app-header__group app-header__group--due-date app-header__date-range">
          <div class="app-header__control app-header__control--date-range">
            <label class="app-header__group-item-label" for="header-due-start">Due date:</label>
            <input
              id="header-due-start"
              type="date"
              value={props.dueDateStart}
              onInput={(e) => props.onDueDateStartChange(e.target.value)}
              placeholder="Start"
              class="date-input"
            />
            <span class="date-range-separator">to</span>
            <input
              id="header-due-end"
              type="date"
              value={props.dueDateEnd}
              onInput={(e) => props.onDueDateEndChange(e.target.value)}
              placeholder="End"
              class="date-input"
            />
          </div>

          <div class="app-header__control app-header__control--date-actions">
            <button
              type="button"
              onClick={handleSetDateRangeToday}
              title="Set due date filter to today"
            >
              Today
            </button>
            <button
              type="button"
              onClick={handleSetDateRangeNext7Days}
              title="Set due date filter to today through next 7 days"
            >
              Next 7 days
            </button>
            <Show when={props.dueDateStart !== "" || props.dueDateEnd !== ""}>
              <button
                type="button"
                onClick={props.onClearDateRange}
                class="date-range-clear"
                title="Clear date range filter"
              >
                ✕
              </button>
            </Show>
          </div>
        </div>
      </div>
    </header>
  );
}
